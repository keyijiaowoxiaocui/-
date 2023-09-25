// 引入 axios
import axios from 'axios'

import {getToken} from '../utils/setToken'
import { Message } from 'element-ui'
// 封装 baseURL
const request2 = axios.create({
  baseURL: "",
  timeout:3000, //请求的超时毫秒数
  contentType: "application/json",
})


// 添加请求拦截器
request2.interceptors.request.use((config) => {
  // 在请求之前做些什么(获取并设置token)
  console.log('请求');
  // console.log(getToken('token'));
  // console.log(config.headers.token);
  config.headers['Content-Type'] = 'application/json'
  config.headers.Authorization = 'Bearer ' + getToken('token')
  return config
}),(error) => {
  return Promise.reject(error)
}

// 添加响应拦截器
request2.interceptors.response.use((response) => {
  // 对响应数据做些什么
  console.log('响应');
  let {status , message} = response.data
  // if (status !== 200) {
  //   Message({message: message || 'error', type:'warning'})
  // }
  return response
}),(error) => {
  return Promise.reject(error)
}


// 向外暴露 request
export default request2 ;