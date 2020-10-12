// 此文件将发送请求
import axios from 'axios';
import jsonp from 'jsonp';
import myAxios from './myAxios.js';
import {BASE_URL} from '../config/index.js';
// 登录
export const reqLogin = (username, password) => myAxios.post(`${BASE_URL}/login`, {username, password});
// 位置 jsonp
export const reqLocal = () => {
    return new Promise((resolve, reject) => {
        // http://whois.pconline.com.cn/ipJson.jsp/?jsonp=true    http://whois.pconline.com.cn/jsFunction.jsp
        jsonp('http://whois.pconline.com.cn/ipJson.jsp/?jsonp=true', (err, data) => {
            console.log(data)
            if(err){
                reject('位置接口错误!');
            }else{
                resolve(data.city);
            }
        })
    })
};

// export const reqLocal = () => {
//     myAxios.get(`${BASE_URL}/location/local`).then(value => console.log(value));
// }
// 天气
export const reqWeather = (place) => axios.get(`http://wthrcdn.etouch.cn/weather_mini?city=${place}`);
// 分类列表
export const reqCategoryList = () => myAxios.get(`${BASE_URL}/manage/category/list`);
// 添加分类
export const reqAddCategory = (categoryName) => myAxios.post(`${BASE_URL}/manage/category/add`, {categoryName});
// 修改分类
export const reqUpdateCategory = (categoryId, categoryName) => myAxios.post(`${BASE_URL}/manage/category/update`, {categoryId, categoryName});
// 获取商品
export const reqProductList = (pageNum, pageSize) => myAxios.get(`${BASE_URL}/manage/product/list`, {params:{pageNum, pageSize}});
// 更新商品状态上架，下架 status是要更新的状态
export const reqUpdateProductState = (productId, status) => myAxios.post(`${BASE_URL}/manage/product/updateStatus`, {productId, status});
// 搜索特定商品列表
export const reqSearchProductList = (pageNum,pageSize,searchType,keyWord) => myAxios.get(`${BASE_URL}/manage/product/search`, {params:{pageNum, pageSize, [searchType]:keyWord}});
// 根据商品id获取商品详细
export const reqProductDetail = (productId) => myAxios.get(`${BASE_URL}/manage/product/info`, {params:{productId}});
// 根据分类id获取商品分类
export const reqProductCategory = (categoryId) => myAxios.get(`${BASE_URL}/manage/category/info`, {params:{categoryId}});
// 删除图片
export const reqRemovePhoto = (name) => myAxios.post(`${BASE_URL}/manage/img/delete`, {name});
// 添加商品
export const reqAddProduct = (obj) => myAxios.post(`${BASE_URL}/manage/product/add`, {...obj});
// 请求修改商品
export const reqUpdateProduct = (obj) => myAxios.post(`${BASE_URL}/manage/product/update`, {...obj});
// 请求添加角色
export const reqAddRole = (roleName) => myAxios.post(`${BASE_URL}/manage/role/add`, {roleName});
// 请求角色列表
export const reqRoleList = () => myAxios.get(`${BASE_URL}/manage/role/list`);
// 请求授予权限
export const reqAuthRole = (obj) => myAxios.post(`${BASE_URL}/manage/role/update`, {...obj, auth_time: Date.now()});
// 请求用户列表
export const reqUserList = () => myAxios.get(`${BASE_URL}/manage/user/list`);
// 添加一个用户
export const reqAddUser = (obj) => myAxios.post(`${BASE_URL}/manage/user/add`, {...obj});
// 请求修改一个用户
export const reqUpdateUser = (obj) => myAxios.post(`${BASE_URL}/manage/user/update`, {...obj});
// 请求删除一个用户
export const reqDeleteUser = (userId) => myAxios.post(`${BASE_URL}/manage/user/delete`, {userId});