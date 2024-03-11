import axios from "axios";
import { getCookie } from "./Cookie";

const instance = axios.create(
    {
        baseURL: process.env.REACT_APP_API_HOST
    }
);

const request = {
    get: async (url) =>
      instance.get(url, {
        headers: { Authorization: `Bearer ${getCookie("token")??""}` },
      }),
  
    post: async (url, body) =>
      instance.post(url, body, {
        headers: { Authorization: `Bearer ${getCookie("token")??""}` },
      }),
  };
  
  export default request;