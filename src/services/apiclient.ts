import axios from 'axios'
import { apiUrl as baseURL } from '../config/settings.json'

const api = axios.create({ baseURL })

export default api
