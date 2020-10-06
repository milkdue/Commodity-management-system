# 项目过程

## 接口测试

## 搭建redux环境

1. redux
2. reducer => function => return/init newState  index => combineReducers
3. store => reducers => createStore 中间件，当状态改变页面刷新 使用redux工具
4. actions => return action
5. containers => connect(mapStateToProps, mapDispatchToprops)(component)
6. action_types
7. index => Provider => 顶级组件，传递store中的状态

## 配置代理跨域

1. package.json
2. "proxy": "http://localhost:5000"
3. (线上服务器)

## post请求参数是否支持json格式

1. 支持axios post直接传参
2. 不支持 querystring转urlencoded

## axios请求/响应拦截器(github: axios)

1. interceptors

## 路径问题

1. 配置config

## 请求进度条(github: nprogress)

## 响应数据用户redux进行管理

1. 存入redux中userInfo
2. 存入localstorage   setItem(key, value)

## 自动登录

1. 判断redux中isLogin
2. Redirect

## 退出登录

1. 清空redux中userInfo
2. 清空localstorage.remove()
3. 跳转login
4. 使用装饰器Decorator

```js
@f

class A{}

----------

A = f(A)
```
