import axios from 'axios'
import { API_KEY } from "../config";

const instance = axios.create({
    baseURL: 'https://api.thedogapi.com/v1',
    headers: {
        'x-api-key': API_KEY
    }
})

export default instance;