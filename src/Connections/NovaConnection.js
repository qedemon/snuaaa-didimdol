import axios from "axios";
import { getToken } from "../Utils/Cookie";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
});

const request = {
  get: async (url) =>
    instance.get(url, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }),

  post: async (url, body) =>
    instance.post(url, body, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }),

  login: async (body) => instance.post("/authenticate/", body),
};

export default request;
