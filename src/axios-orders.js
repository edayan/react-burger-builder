import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-3691f.firebaseio.com/'
});

export default  instance;