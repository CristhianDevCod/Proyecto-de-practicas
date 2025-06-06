const express = require('express');
const ActiveDirectory = express();
const cors = require('cors');
const ldap = require('ldapjs');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const cookieParser = require('cookie-parser');

ActiveDirectory.use(express.json());
ActiveDirectory.use(cors());
ActiveDirectory.use(cookieParser());

ActiveDirectory.use(
    session({
        secret: process.env.KEY_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 5 * 60 * 1000
        }
    })
);


const options = { expiresIn: '10m' };
function createJwtToken(payload) {
    const secret = process.env.KEY_SECRET;
    return jwt.sign(payload, secret, options);
}

const ldapServers = [
    {
        //server de medellin
        url: process.env.LDAP_URL_IP_MED,
        baseDn: process.env.LDAP_BASE_DN_MED,
        dominio: process.env.DOMINIO_MED
    },
    {
        //server de Basik
        url: process.env.LDAP_URL_IP_BAS,
        baseDn: process.env.LDAP_BASE_DN_BAS,
        dominio: process.env.DOMINIO_BAS
    },
    {
        //server de Toberin
        url: process.env.LDAP_URL_IP_TOBE,
        baseDn: process.env.LDAP_BASE_DN_TOBE,
        dominio: process.env.DOMINIO_TOBE
    }
];

// Add this new endpoint for token renewal
ActiveDirectory.post('/renew-token', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send('No token provided');
    }

    try {
        const decoded = jwt.verify(token, process.env.KEY_SECRET);
        const newToken = createJwtToken({ username: decoded.username });
        
        return res.status(200).send({
            token: newToken,
            tokenExpire: options.expiresIn
        });
    } catch (error) {
        return res.status(401).send('Invalid token');
    }
});

ActiveDirectory.post('/login/ActiveDirectory/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    let errorMessage = ''; // Variable para almacenar el mensaje de error

    // Validar que no tenga caracteres especiales
    if (username.match(/[!@#$%^&*(),.?":{}|<>]/)) {
        errorMessage = 'El usuario de usuario de red no puede contener caracteres especiales';
    } else if (username === '' || password === '') {
        errorMessage = 'El usuario de red y/o la contraseña no pueden estar vacios';
    }

    if (errorMessage) {
        return res.status(400).json(errorMessage);
    }

    let i = 0;
    const tryLdapServer = async () => {
        try {
            const ldapClient = ldap.createClient({
                url: ldapServers[i].url
            });

            const fullUsername = `${username}@${ldapServers[i].dominio}`;
            const searchOptions = {
                scope: 'sub',
                filter: `(sAMAccountName=${username})`,
                attributes: ['dn', 'memberOf', 'cn', 'sn']
            };
            try {
                await bindAsync(ldapClient, fullUsername, password);

                const result = await searchAsync(ldapClient, ldapServers[i].baseDn, searchOptions);

                if (result) {
                    res.cookie('sessionID', JSON.stringify(username, password), { httpOnly: true });
                    ldapClient.unbind();

                    session.user = {
                        username
                    };

                    const token = createJwtToken({ username });
                    console.log(username);
                    return res.status(200).send({
                        token,
                        username: username,
                        tokenExpire: options.expiresIn
                    });
                } else {
                    ldapClient.unbind();
                    i++;
                    if (i < ldapServers.length) {
                        tryLdapServer();
                    } else {
                        return res.status(401).send('El usuario de red o contraseña incorrectos');
                    }
                }
            } catch (error) {
                ldapClient.unbind();
                i++;
                if (i < ldapServers.length) {
                    tryLdapServer();
                } else {
                    return res.status(401).send('El usuario de red o contraseña incorrectos');
                }
            }
        } catch (error) {
            return res.status(500).send('Error interno del servidor');
        }
    };

    tryLdapServer().catch((error) => {
        return res.status(500).send('Error interno del servidor');
    });
});

ActiveDirectory.get('/login/ActiveDirectory/session', (req, res) => {
    const token = req.cookies.sessionID;
    if (!token) {
        return res.status(401).send('No hay sesión activa');
    }

    try {
        const decoded = jwt.verify(token, process.env.KEY_SECRET);
        const currentTime = Math.floor(Date.now() / 1000);
        const timeRemaining = decoded.exp - currentTime;
        return res.status(200).send({ timeRemaining });
    } catch (error) {
        return res.status(500).send('Error interno del servidor');
    }
});

// Función para realizar el bind de manera asíncrona
function bindAsync(client, username, password) {
    return new Promise((resolve, reject) => {
        client.bind(username, password, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function searchAsync(client, baseDn, options) {
    return new Promise((resolve, reject) => {
        client.search(baseDn, options, (err, result) => {
            if (err) {
                reject(err);
            } else {
                result.on('searchEntry', () => {
                    resolve(true);
                });
                result.on('end', () => {
                    resolve(false);
                });
                result.on('error', (error) => {
                    reject(error);
                });
            }
        });
    });
}

module.exports = ActiveDirectory;
