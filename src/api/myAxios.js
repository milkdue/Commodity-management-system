import axios from 'axios';
import qs from 'querystring';
import {message} from 'antd';
import NProgress from 'nprogress';
import store from '../redux/store.js';
import {deleteUserInfoAction} from '../redux/actions/create_or_delete_user_info_action.js';
import 'nprogress/nprogress.css';

// 配置axios 请求/响应拦截器 超时
const myAxios = axios.create({
    // 超过4秒，请求超时
    timeout: 4000
});


// 请求拦截器
myAxios.interceptors.request.use(function (config) {
    // 进度条开始
    NProgress.start();
    // 如果有token 设置config的headers中的Authorization在redux中的token
    // console.log(config);
    // console.log(store.getState().userInfo.token);
    if(store.getState().userInfo.token){
        config.headers.Authorization = 'progect_' + store.getState().userInfo.token;
    }
    /**
     * config: 
     * {url: "http://localhost:3000/login", method: "post", data: "{"username":"admin","password":"admin"}", headers: {…}, transformRequest: Array(1), …}
        data: {status: 1, msg: "用户名或密码不正确!"}
        headers: {connection: "close", content-length: "49", content-type: "application/json; charset=utf-8", date: "Mon, 05 Oct 2020 03:17:59 GMT", etag: "W/"31-cZyBaqc2kc89LjgTCRgjuE4wnH0"", …}
        request: XMLHttpRequest {readyState: 4, timeout: 4000, withCredentials: false, upload: XMLHttpRequestUpload, onreadystatechange: ƒ, …}
        status: 200
        statusText: "OK"
     */
    // 服务器无法处理json数据参数 处理
    config.data = qs.stringify(config.data)
    return config;
}, function (error) {
    // console.log(error);
    return Promise.reject(error);
});

// 响应拦截器
myAxios.interceptors.response.use(function (response) {
    // console.log(response);
    // 进度条结束
    NProgress.done();
    /**
     *  response: 
     * config: {url: "http://localhost:3000/login", method: "post", data: "username=admin&password=admin", headers: {…}, transformRequest: Array(1), …}
        data:
            {data: {user: {…}, token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmN…DY4fQ.4QQA17VLfNDFOa3ZZqKsFcBzkjQBXDl5ID_YV7k2FBY"}
            status: 0
            __proto__: Object}
        headers: {connection: "close", content-length: "312", content-type: "application/json; charset=utf-8", date: "Mon, 05 Oct 2020 03:24:28 GMT", etag: "W/"138-mjgsOGWXTEjQ2fERTS//uQlc9p8"", …}
        request: XMLHttpRequest {readyState: 4, timeout: 4000, withCredentials: false, upload: XMLHttpRequestUpload, onreadystatechange: ƒ, …}
        status: 200
        statusText: "OK"
     */
    return response.data;
}, function (error) {
    // 进度条结束
    NProgress.done();
    if(error.response.status === 401){
        message.warning('身份校验失败，请重新登录！', 1);
        // 清空redux中的状态
        store.dispatch(deleteUserInfoAction());

    }else{
        
        message.error(error.message);
    }
    // debugger;
    // console.log(error);
    // 失败中断promise链
    return new Promise(() => {})
});


export default myAxios;