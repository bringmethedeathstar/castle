import axios from 'axios';

const fetch = axios.create({
  method: 'GET',
  baseURL: '.netlify/functions/fetch',
});

export default fetch;
