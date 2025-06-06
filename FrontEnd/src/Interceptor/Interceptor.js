import axios from 'axios';

const api = axios.create();

// Agrega un interceptor de respuesta
api.interceptors.response.use(
    (response) => {
        // Modifica la respuesta para ocultar información sensible
        const modifiedResponse = response;
        delete modifiedResponse.config; // Elimina la configuración de la petición

        return modifiedResponse;
    },
    (error) => {
        // Filtra y maneja errores específicos
        if (error.response && error.response.status === 404) {
            return Promise.resolve();
        } else if (error.response && error.response.status === 400) {
            return Promise.resolve();
        } else if (error.response && error.response.status === 500) {
            return Promise.resolve();
        }
        return Promise.resolve();
    }
);

export default api;
