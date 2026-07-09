import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:7777/api",
  withCredentials: true, // cookie ke liye ZAROORI
});

export default api;