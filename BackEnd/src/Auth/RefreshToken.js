const cors = require('cors');
const mysql = require('mysql2');
const express = require('express');
const jwt = require('jsonwebtoken');
const RefreshToken = express.Router();



RefreshToken.use(cors());
RefreshToken.use(express.json());
RefreshToken.use(express.urlencoded({ extended: false }));

// Ruta para refrescar el token
RefreshToken.post('/refresh-token', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.REFRESH_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        const newToken = jwt.sign({ username: user.username }, process.env.KEY_SECRET, { expiresIn: '15m' });
        res.json({ token: newToken });
    });
});


module.exports = RefreshToken;