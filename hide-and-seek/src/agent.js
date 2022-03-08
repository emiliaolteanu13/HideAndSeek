import axios from "axios";

axios.defaults.baseURL = axios.defaults.baseURL = 'http://localhost:7277/api/file';

const responseBody =  (response) => response.data;

const requests = {
    post : (url, body) => axios.post(url, body).then(responseBody), 
}

const File = {
    upload: (file) => axios.post('/file', file),
}