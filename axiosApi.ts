import { BASE_URL } from "./globalConstants";
import axios from "axios";

const axiosApi = axios.create({
  baseURL: BASE_URL,
});

export default axiosApi;
