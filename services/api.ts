import axios from 'axios';

export const api = axios.create({
    baseURL: "http://192.168.68.153:3000",
    timeout: 1000,//Se o servidor demorar para responder ele vai para o processo
})