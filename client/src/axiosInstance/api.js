import axios from 'axios'

const api = axios.create({
    baseURL: "https://online-library-server.herokuapp.com"
})

export default api