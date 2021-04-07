import axios from 'axios';

axios.defaults.baseURL = 'https://localhost:44394/api';

/* incluir el token en los headers de los request de axios */
axios.interceptors.request.use((config) => {
    //token
    const token_seguridad = window.localStorage.getItem('token_seguridad');
    if (token_seguridad) {
        config.headers.Authorization = 'Bearer ' + token_seguridad;
        return config;
    }
})

/* Crear objeto Request */
const requestGenerico = {
    get: (url) => axios.get(url),
    post: (url, body) => axios.post(url, body),
    put: (url, body) => axios.put(url, body),
    delete: (url) => axios.delete(url),
};
export default requestGenerico;