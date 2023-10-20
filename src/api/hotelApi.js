import axios from "axios";

const access_token = localStorage.getItem('access_token')

const authApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/hotels',
    headers:{
        Authorization: `Bearer ${access_token}`
    }
})

export default authApi
