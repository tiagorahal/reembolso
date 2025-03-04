import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptador para armazenar os headers de autenticação após o login
api.interceptors.response.use((response) => {
  if (response.headers["access-token"]) {
    localStorage.setItem("access-token", response.headers["access-token"]);
    localStorage.setItem("client", response.headers["client"]);
    localStorage.setItem("uid", response.headers["uid"]);
  }
  return response;
});

// Interceptador para incluir os tokens em todas as requisições autenticadas
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const uid = localStorage.getItem("uid");

  if (token && client && uid) {
    config.headers["access-token"] = token;
    config.headers["client"] = client;
    config.headers["uid"] = uid;
  }
  
  return config;
});

export default api;
