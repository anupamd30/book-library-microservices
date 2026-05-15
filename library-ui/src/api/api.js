import axios from "axios";

const api = axios.create({
  baseURL: "https://api-gateways-api-dzh0dfebgwgkgqgq.centralindia-01.azurewebsites.net" // API Gateway
});

export default api;