import axios from 'axios'
import { apiUrl as baseURL } from '../config/settings.local.json'

const api = axios.create({ baseURL })

export default api
