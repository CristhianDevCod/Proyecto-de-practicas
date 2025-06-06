import './Styles/stylesLogin.css';
import Config from '../../Auth/Config';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import {
  Swal,
  React,
  axios,
  // Logo2,
  Button,
  useState,
  useContext,
  LogoNavidad
} from '../../Exports-Modules/Exports';


const Login = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { loginURL } = Config();
  const [userID, setInput] = useState({ username: '', password: '' });
  const [loading, setIsLoading] = useState(false);
  // Función para manejar el cambio de inputs
  const inputChange = ({ target }) => {
    const { name, value } = target;
    // Convertimos el username a minúsculas si se está escribiendo en el campo 'username'
    setInput({
      ...userID,
      [name]: name === 'username' ? value.toLowerCase() : value,
    });
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(loginURL, userID);
      const data = response.data;
      // console.log(data);

      auth(data.username);
      setIsLoading(false);
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('username', data.username);
      localStorage.setItem('_Secure-next-auth.session-token', data.token);
      localStorage.setItem('tokenExpire', data.tokenExpire);
      navigate('/Home');
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        Swal.fire({
          icon: 'error',
          text: `${error.response.data}`,
        });
        window.location.reload();
      } else {
        window.location.reload();
        setIsLoading(false);
        Swal.fire({
          icon: 'error',
          text: `Error en la solicitud. Por favor, inténtalo de nuevo.`,
        });
      }
    }
  };


  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className='container-login-form'>
      <div className='container-login'>
        <form name='form1' className='box' method='POST' type='onSubmit'>
          <h4>
            {/* <img className='img' src={Logo2} alt='' /> */}
            <img className='img' src={LogoNavidad} alt='' />
          </h4>
          <h5>UN UNIVERSO DE SOLUCIONES</h5>
          <input
            id='username'
            type='string'
            maxLength={20}
            name='username'
            onChange={inputChange}
            value={userID.username}
            placeholder='Usuario de red'
          ></input>

          <input
            id='password'
            type='password'
            placeholder='Contraseña'
            name='password'
            value={userID.password}
            onChange={inputChange}
            onKeyPress={handleEnter}
            autoComplete='new-password'
          />

          <Button
            disabled={loading}
            variant='contained'
            sx={{
              top: '79%',
              width: '340px',
              height: '49px',
              color: '#dfdeee',
              fontSize: '16px',
              transition: '0.3s',
              cursor: 'pointer',
              background: '#004980',
              borderRadius: '100px',
            }}
            onClick={onSubmit}
          >
            {loading ?
              <>
                <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true' />
                Cargando...
              </>
              :
              ('Ingresar')}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
