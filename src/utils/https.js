import axios from "axios";
import { baseUrl,refresh } from "./urls";

export const authHost = axios.create({
    baseURL : `${baseUrl}`
})

export const $mediaApi = axios.create({
    baseURL: "https://media-api.main-gate.appx.uz",
  });


  authHost.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("accessToken");
  
      if (accessToken) {
        config.headers["x-auth-token"] = accessToken;
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  )

  authHost.interceptors.response.use((response) => {
    const originalRequest = response.config;
    let refreshToken = localStorage.getItem("refreshToken");
    let id = localStorage.getItem("id");
  
    if (
      refreshToken &&
      response.data.code === 400 &&
      response.data.error === "JWT_EXPIRED" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return authHost
        .post(refresh, {
          refreshToken,
          id,
        })
        .then((res) => res.data)
        .then((data) => {
          if (data.code === 200) {
            localStorage.setItem("accessToken", data.data.accessToken);
            console.log("Access token refreshed!");
            return authHost(originalRequest);
          }
        });
    } else return response;
  });
  