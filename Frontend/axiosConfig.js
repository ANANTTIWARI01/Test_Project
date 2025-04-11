import axios from "axios";

const instance = axios.create({
    baseURL: "https://test-project-backend-9l11.onrender.com/api",
    withCredentials:true
});

export default instance;
