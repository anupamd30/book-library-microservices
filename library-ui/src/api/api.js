import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000" // API Gateway
});

export default api;