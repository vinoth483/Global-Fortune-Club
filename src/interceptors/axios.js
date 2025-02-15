import axios from "axios";
import {getAuth,setAuth} from "../context/localStorage"
const BASE_URL = 'http://localhost:3333/api/v01';
// const BASE_URL = 'https://nodeapiv2.globalfc.app/api/v01';


export default axios.create({

  baseURL:BASE_URL
  // baseURL : "https://nodeapi.globalfc.app/"
})

export const privateApi = axios.create({
    baseURL:BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    }

  // baseURL: "https://nodeapi.globalfc.app/",
  // baseURL: "http://localhost:3333/v1",
  // wsURL:"ws://localhost:5001/"
});

// Request interceptor
privateApi.interceptors.request.use(
  (config) => {
    const auth=getAuth()
    const accessToken = auth?.accessToken;
    const refreshToken = auth?.refreshToken;

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    if (refreshToken) {
      config.headers['x-refresh'] = refreshToken;
    }
    return config;
  },
  (error) => {
    console.error("Request Error Interceptor:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
privateApi.interceptors.response.use(
  (response) => {
    console.log("in response interceptor",response)
    const newAccessToken = response.headers['x-access-token'];

    if (newAccessToken) {
      // Store the new access token
      const authPayload={
        accessToken:newAccessToken
      }
      setAuth(authPayload,true,true)

    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
