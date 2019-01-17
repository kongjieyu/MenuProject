import axios from 'axios'
import { Toast } from 'antd-mobile'

//拦截请求
axios.interceptors.request.use(function(config){
    Toast.loading('加载中', 0)
    return config
},function (error) {
    Toast.fail('Load failed !!!', 1);
    return Promise.reject(error);
  })

//拦截相应
axios.interceptors.response.use(function(config){
    Toast.hide()
    return config
},function (error) {
    Toast.fail('Load failed !!!', 1);
    return Promise.reject(error);
  })
