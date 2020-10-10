# 项目过程

## 接口测试

## 登录接口

> <http://localhost:5000/login>

------------------------------------------------------------

### 请求方式

> POST

------------------------------------------------------------

### 参数类型

|参数|是否必选|类型|说明|
|:--:|:-----:|:--:|:--:|
|username|Y|string|用户名|
|password|Y|string|密码|

------------------------------------------------------------

## 搭建redux环境

1. redux
2. reducer => function => return/init newState  index => combineReducers
3. store => reducers => createStore 中间件，当状态改变页面刷新 使用redux工具
4. actions => return action
5. containers => connect(mapStateToProps, mapDispatchToprops)(component)
6. action_types
7. index => Provider => 顶级组件，传递store中的状态

------------------------------------------------------------

## 配置代理跨域

1. package.json
2. "proxy": "http://localhost:5000"
3. (线上服务器)

------------------------------------------------------------

## post请求参数是否支持json格式

1. 支持axios post直接传参
2. 不支持 querystring转urlencoded

------------------------------------------------------------

## axios请求/响应拦截器(github: axios)

1. interceptors

------------------------------------------------------------

## 路径问题

1. 配置config

------------------------------------------------------------

## 请求进度条(github: nprogress)

## 响应数据用户redux进行管理

1. 存入redux中userInfo
2. 存入localstorage   setItem(key, value)

------------------------------------------------------------

## 自动登录

1. 判断redux中isLogin
2. Redirect

------------------------------------------------------------

## token验证

## layout布局

## 子路由搭建

## 头部布局

## 登录状态过期提示

## 全屏(github: screenfull)

## 退出登录

1. 清空redux中userInfo
2. 清空localstorage.remove()
3. 跳转login

------------------------------------------------------------

## 时间

## 获取位置(<http://whois.pconline.com.cn/ipJson.jsp?jsonp=true>)

1. 支持jsonp
2. 支持json(需要跨域)

------------------------------------------------------------

## 获取天气(ajax跨域)

- 接口： <http://wthrcdn.etouch.cn/weather_mini?city=北京>
- 中央气象台免费接口，支持跨域

- 百度天气图片ui,未做防盗链

1. <http://api.map.baidu.com/images/weather/day/duoyun.png>
2. <http://api.map.baidu.com/images/weather/day/qing.png>
3. <http://api.map.baidu.com/images/weather/day/xiaoyu.png>
4. <http://api.map.baidu.com/images/weather/day/zhongyu.png>
5. <http://api.map.baidu.com/images/weather/day/dayu.png>
6. <http://api.map.baidu.com/images/weather/day/yin.png>
7. <http://api.map.baidu.com/images/weather/day/leizhenyu.png>
8. <http://api.map.baidu.com/images/weather/day/zhenyu.png>
9. <http://api.map.baidu.com/images/weather/day/xiaoxue.png>
10. <http://api.map.baidu.com/images/weather/day/zhongxue.png>
11. <http://api.map.baidu.com/images/weather/day/daxue.png>
12. <http://api.map.baidu.com/images/weather/day/baoyu.png>
13. <http://api.map.baidu.com/images/weather/day/dabaoyu.png>
14. <http://api.map.baidu.com/images/weather/day/mai.png>
15. <http://api.map.baidu.com/images/weather/day/wu.png>

------------------------------------------------------------

## withRouter

1. 高阶组件(装饰器语法)
2. 使用路由组件中的this.props.location.pathname
3. 解决头部title

------------------------------------------------------------

## 导航和导航切换

## 根据导航配置文件动态生成导航

1. 递归

------------------------------------------------------------

## 导航默认选中和自动打开

1. 根据url默认选中和自动打开
2. 根据pathname设置组件的默认打开和默认选中数组
3. render时每次都执行
4. 使用selectedKeys设置默认选中,如果是default只以第一次为准

------------------------------------------------------------

## 展示头部title

1. redux保存title 点击导航的时候更新title
2. state保存title 从redux中取标题，刷新时从pathname中取

------------------------------------------------------------

## 商品分类静态页面搭建

1. antd Table组件

------------------------------------------------------------

## 请求数据列表数据

> <http://localhost:5000/manage/category/list>

1. 无参数，但需要带token 请求拦截器已配置
2. post

------------------------------------------------------------

## 新增修改模态框

1. antd模态框

------------------------------------------------------------

## 新增商品分类

1. state中的type区分模态框的title

------------------------------------------------------------

## 更新商品分类

1. <http://localhost:5000/manage/category/update>
2. POST
3. 数据回显 注意使用componentDidUpdate()钩子因为setState是异步的

------------------------------------------------------------

## 商品管理页面

1. antd

------------------------------------------------------------

## 请求商品数据

1. <http://localhost:5000/manage/product/list>
2. get
3. 参数为请求页码,每页显示几条

------------------------------------------------------------

## 分页逻辑

1. 前端分页
    - 一次性返回所有数据,前端人员进行数据切割,整理,划分页数
    - 数据量过大时,会产生页面卡顿或浏览器'假死'
    - 前端不喜欢这种分页
2. 后端分页
    - 返回的是一部分数据,需要请求时指明:每页显示几条,服务器进行数据分割
    -后台需整理
        - 每页展示多少条数据
        - 请求那一页
        - 数据库中有多少条数据

------------------------------------------------------------

## 商品状态

1. 放入state中根据status修改商品状态

------------------------------------------------------------

## 发送搜索请求

1. get
2. <http://localhost:5000/manage/product/search?pageNum=1&pageSize=5&productName=T>

------------------------------------------------------------

## 商品详情和修改路由搭建以及参数路由

1. 点击跳转
2. 头部标题问题

------------------------------------------------------------

## 展示详情

1. <http://localhost:5000/manage/product/info>
2. get
3. 图片路径问题

------------------------------------------------------------

## 获取某一个商品的分类信息

1. <http://localhost:5000/manage/category/info>
2. get

------------------------------------------------------------

## 添加商品

1. 静态页面
2. <http://localhost:5000/manage/product/add>
3. post

## 上传图片

1. <http://localhost:5000/manage/img/upload>
2. post

## 删除图片

1. <http://localhost:5000/manage/img/delete>
2. post

## 修改商品

1. 复用组件
2. 数据回显
3. <http://localhost:5000/manage/product/update>
4. post

## 角色管理

1. 