
import axios from "axios";

const http = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://binary-automates-api.onrender.com/api",
  timeout: 10000,
});

export default http;