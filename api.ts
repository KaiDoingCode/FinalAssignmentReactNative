/* eslint-disable prettier/prettier */
import axios from 'axios';

const API_KEY = 'f8a5467bfbf5c0747dcf5b885d67852f';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = (city : string) => {
  return axios.get(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}`);
};
