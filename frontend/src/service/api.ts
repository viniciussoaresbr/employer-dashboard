import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const locationApi = axios.create({
  baseURL: process.env.REACT_APP_API_LOCATION,
});

export const addressApi = axios.create({
  baseURL: process.env.REACT_APP_API_ADDRESS,
});
