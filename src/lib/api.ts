import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-volleyball.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'api-volleyball.p.rapidapi.com'
  }
});

export default api;