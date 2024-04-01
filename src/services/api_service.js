import axios from "axios";
import { BaseURL } from "./base_url";

const baseURL = `${BaseURL}api`

const apiService = axios.create({
  baseURL,
});

export default apiService 