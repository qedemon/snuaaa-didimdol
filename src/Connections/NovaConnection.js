import axios from "axios";
import { getToken } from "@utils/Cookie";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
});

const request = {
  get: async (url, withToken=true) =>
    instance.get(url, {
      headers: withToken?{ Authorization: `Bearer ${getToken()}` }:{},
    }),

  post: async (url, body, withoutToken=false) =>
    instance.post(url, body, {
      headers: withoutToken?{ Authorization: `Bearer ${getToken()}` }:{},
    }),

  login: async (body) => instance.post("/authenticate/", body),
};

export default request;
