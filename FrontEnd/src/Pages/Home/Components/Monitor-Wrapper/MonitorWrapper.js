import React, { useState, useEffect } from 'react';

import './Styles/Styles.css';
import Service from '../../../../Machine/Service';
import apiClient from '../../../../Service/Service';


function MonitorWrapper() {
    const { Servidor } = Service();
    const [quote, setQuote] = useState('');

    useEffect(() => {
        fetchMotivationalQuote();

        // Configura un intervalo para obtener nuevas frases cada 10 segundos (10000 milisegundos)
        const interval = setInterval(() => {
            fetchMotivationalQuote();
        }, 30000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const fetchMotivationalQuote = () => {
        // Realiza una solicitud a la API para obtener una nueva frase
        apiClient.get(`http://${Servidor}/API/GET/PHRASES/`)
            .then((response) => response.data)
            .then((data) => {
                setQuote(data.frase);
            })
            .catch((error) => {
                console.error('Error al obtener la frase motivadora:', error);
            });
    };

    return (
        <>
            <div className='motivational-quote-wrapper'>
                <div className='motivational-quote'>
                    <p className='text-move'>{quote}</p>
                </div>
                <div className='greeting'>Heyy👋</div>
            </div>
        </>
    );
}

export default MonitorWrapper;
