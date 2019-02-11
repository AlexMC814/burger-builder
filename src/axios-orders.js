import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-8113b.firebaseio.com/',
});

export default instance;
