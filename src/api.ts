import axios from "axios";

const api = axios.create({
  baseURL: "http://45.161.137.26:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
