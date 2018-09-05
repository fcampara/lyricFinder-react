import axios from 'axios'

export const AxiosInstance = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/',
    params: {apikey: process.env.REACT_APP_MM_KEY}
})