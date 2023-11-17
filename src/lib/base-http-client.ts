import axios from "axios";

const apiService = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json"
  }
});

export default apiService;
