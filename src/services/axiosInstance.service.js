import axios from "axios";
import authHeader from './auth-header';
const baseURL = `http://localhost:8080/api`;

let headers = {};

if (localStorage.token) {
    headers.Authorization = authHeader();
    headers.AccessControlAllowOrigin =  "*";
  }
const axiosInstance = axios.create({
    baseURL: baseURL,
    headers,
})

axiosInstance.interceptors.response.use(
    (response) =>
        new Promise((resolve, reject) => {
            resolve(response)
        }),
    (error) => {
        if (!error.response) {
            return new Promise((resolve, reject) => {
                reject(error)
            });
        }
        console.log("error.response",error.response)
        if(error.response.status === 500){
            localStorage.removeItem("token");
            window.location = "/login";
        }else{
            return new Promise((resolve, reject) => {
                reject(error)
            });
        }
    }

)

export default axiosInstance