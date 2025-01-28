// src/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api', // 设置基础 URL
  timeout: 5000, // 可选：设置请求超时
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//     "Content-Type": "application/json;charset=utf-8"
//   }
});

// 添加请求拦截器（可选）
axiosInstance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    console.log('请求拦截器', config);
    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 添加响应拦截器（可选）
axiosInstance.interceptors.response.use(
  (response) => {
    // 处理响应数据
    console.log('响应拦截器', response);
    return response;
  },
  (error) => {
    // 处理响应错误
    return Promise.reject(error);
  }
);

export default axiosInstance;