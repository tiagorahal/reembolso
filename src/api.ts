import axios from "axios";
import Cookies from 'js-cookie'

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use((response) => {
  if (response.headers["access-token"]) {
    Cookies.set("access-token", response.headers["access-token"], { secure: true, sameSite: "Strict" });
    Cookies.set("client", response.headers["client"], { secure: true, sameSite: "Strict" });
    Cookies.set("uid", response.headers["uid"], { secure: true, sameSite: "Strict" });
  }
  return response;
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("access-token");
  const client = Cookies.get("client");
  const uid = Cookies.get("uid");

  if (token && client && uid) {
    config.headers["access-token"] = token;
    config.headers["client"] = client;
    config.headers["uid"] = uid;
  }

  return config;
});

export default api;
