import axios from 'axios';
import { apiBaseUrl } from '../environment/environment';

const instance = axios.create({
  baseURL: apiBaseUrl,
});

export default instance;
