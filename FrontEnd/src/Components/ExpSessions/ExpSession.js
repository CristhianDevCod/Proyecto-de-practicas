import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const SessionExpiration = () => {
    const navigate = useNavigate();
    const [sessionTimer, setSessionTimer] = useState(10 * 60);

    useEffect(() => {
        const interval = setInterval(() => {
            setSessionTimer(prevTimer => prevTimer - 1);
        }, 1000);

        if (sessionTimer <= 0) {
            Swal.fire({
                icon: 'info',
                title: 'Oops...',
                text: 'Tu sesion ha expirado',
            })
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            localStorage.removeItem('_Secure-next-auth.session-token');
            navigate('/');
        }

        return () => clearInterval(interval);
    }, [sessionTimer, navigate]);

    const handlePageInteraction = () => {
        setSessionTimer(10 * 60);
    };

    useEffect(() => {
        window.addEventListener('click', handlePageInteraction);
        return () => window.removeEventListener('click', handlePageInteraction);
    }, []);

    return (
        <>
            {/* <div className='text-muted'>Tiempo restante de sesión: {Math.floor(sessionTimer / 60)}:{sessionTimer % 60}</div> */}
        </>
    );
};

export default SessionExpiration;
