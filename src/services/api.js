import axios from "axios";

const api = axios.create({
    baseURL: 'https://6xih7zuq2l.execute-api.sa-east-1.amazonaws.com/dev/'
})

export default api;