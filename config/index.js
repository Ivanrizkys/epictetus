import axios from "axios";

const api = axios.create({
    baseURL: "http://139.59.226.152:1337/api",

})

export default api