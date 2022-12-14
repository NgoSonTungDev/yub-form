import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const newConfig = {
      ...config,
      token: 123,
    };
    return newConfig;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
