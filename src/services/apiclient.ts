import axios from 'axios'
import settings from 'src/core/config/settings.json'

const api = axios.create({ baseURL: settings.apiUrl })
export default api
