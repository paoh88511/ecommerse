import axios from "axios";
const instance = axios.create({
  baseURL: "https://managentecommerse.onrender.com",
});
export default instance;
