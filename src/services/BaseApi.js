// BaseApi.js
import axios from "axios";

class BaseApi {
  constructor() {
    // This Mock URL is just for your testing otherwise it should be in .env
    const baseURL = `https://67c8185cc19eb8753e7c3744.mockapi.io/v1`;

    this.axiosInstance = axios.create({
      baseURL,
    });

    // Request interceptor (optional)
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Request config here (e.g., add headers)
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor (optional)
    this.axiosInstance.interceptors.response.use(
      (response) => {
        // response here (e.g., handle success responses)
        return response;
      },
      (error) => {
        // handle errors here (e.g., show error messages)
        console.log(error);
        return Promise.reject(error);
      }
    );
  }

  buildUrl(endpoint) {
    return `${this.axiosInstance.defaults.baseURL}/${endpoint}`;
  }

  async get(endpoint, config = {}) {
    const url = this.buildUrl(endpoint);
    return this.axiosInstance.get(url, config);
  }

  async post(endpoint, data, config = {}) {
    const url = this.buildUrl(endpoint);
    return this.axiosInstance.post(url, data, config);
  }

  async put(endpoint, data, config = {}) {
    const url = this.buildUrl(endpoint);
    return this.axiosInstance.put(url, data, config);
  }

  async delete(endpoint, config = {}) {
    const url = this.buildUrl(endpoint);
    return this.axiosInstance.delete(url, config);
  }
}

export default BaseApi;
