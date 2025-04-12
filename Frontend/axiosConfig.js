import axios from "axios";

const instance = axios.create({
    baseURL: "https://test-project-backend-9l11.onrender.com/api",
    // baseURL:"http://localhost:8080/api",

    withCredentials:true
});


export default instance;
