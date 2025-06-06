import axios from "axios";
import Service from "../Machine/Service";
import Swal from "sweetalert2";

const { Servidor } = Service();

const TOKEN_KEY = "_Secure-next-auth.session-token";

const apiClient = axios.create({
  baseURL: `http://${Servidor}`,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) { // Cambiado de 403 a 401
      Swal.fire({
        title: 'Sesión expirada',
        text: 'Tu sesión ha expirado. Serás redirigido a la página de inicio.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false,
      }).then(() => {
        clearLocalStorage();
        window.location.href = "/";
      });
    }
    return Promise.reject(error);
  }
);

// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 403) {
//       clearLocalStorage();
//       window.location.href = "/";
//     }
//     return Promise.reject(error);
//   }
// );

function clearLocalStorage() {
  ["username", "isLoggedIn", "tokenExpire", TOKEN_KEY].forEach(key =>
    localStorage.removeItem(key)
  );
}

// Function to renew the token
async function renewToken() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    try {
      const response = await apiClient.post(`http://${Servidor}/renew-token`, {}, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const newToken = response.data.token;
      localStorage.setItem(TOKEN_KEY, newToken);
    } catch (error) {
      // console.error("Error renewing token:", error);
    }
  }
}

// Add click event listener to renew token
if (typeof window !== 'undefined') {
  window.addEventListener('click', renewToken);
}

export default apiClient;