import axios from "axios";
import { API_URL } from "./config";
import { storage } from "provider/storageProvider";
import { Platform } from "react-native";
import Cookies from 'js-cookie';

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "multipart/form-data";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

axios.interceptors.request.use(
  (config) => {
    const token = storage.getString("token");
    console.log("Token", token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if(Platform.OS === 'web') {
      if ((
        config.method == 'post' ||
        config.method == 'put' ||
        config.method == 'delete') &&
        !Cookies.get('XSRF-TOKEN')) {
    
        return setCSRFToken()
          .then(response => config);
      }
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

const setCSRFToken = () => {
  return axios.get('/sanctum/csrf-cookie')
}

// axios.interceptors.response.use(function (response) {
//   // Any status code that lie within the range of 2xx cause this function to trigger
//   // Do something with response data

//   return response;
// }, function (error) {
//   // Any status codes that falls outside the range of 2xx cause this function to trigger
//   // Do something with response error
//   if (error?.response?.status === 401 && typeof window !== undefined) {
//     // window?.localStorage.clear();
//     // console.log(PUBLIC_LINKS)
//     // !String(PUBLIC_LINKS).includes(Router.pathname) && Router.replace(LOGIN_URL)
//   }
//   return Promise.reject(error);
// });


export default axios;
