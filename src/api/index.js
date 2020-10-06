// 此文件将发送请求
import axios from 'axios';
import jsonp from 'jsonp';
import myAxios from './myAxios.js';
import {BASE_URL} from '../config/index.js';

export const reqLogin = (username, password) => myAxios.post(`${BASE_URL}/login`, {username, password});
export const reqCategoryList = () => myAxios.get(`${BASE_URL}/manage/category/list`);
export const reqLocal = () => {
    return new Promise((resolve, reject) => {
        jsonp('http://whois.pconline.com.cn/ipJson.jsp?jsonp=true', (err, data) => {
            if(err){
                reject('位置接口错误!');
            }else{
                resolve(data.city);
            }
        })
    })
};

export const reqWeather = (place) => axios.get(`http://wthrcdn.etouch.cn/weather_mini?city=${place}`);