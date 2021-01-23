import axios from 'axios';

const clienteAxios = axios.create({
    // baseURL: process.env.REACT_APP_BACKEND_URL
    baseURL: 'http://192.168.0.102:4000'
});

export default clienteAxios;