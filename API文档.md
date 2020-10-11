# 接口文档

## 附录

1. 公共请求参数

------------------------------------------------------------

> 每个接口需要的Header参数值（登录接口不需要）

------------------------------------------------------------

|参数名称|类型|是否必选|描述
|:----:|:---:|:----:|:------:|
Authorization|String|Y|登录的token|

------------------------------------------------------------

例如： progect_token
progect_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNmEyYTU2OTZiODExMjEzYzI2Yjg3ZiIsImlhdCI6MTU2NzM4ODUwOCwiZXhwIjoxNTY3OTkzMzA4fQ.XF42Fq6mESxStnAVEF-bmYEfAHDCvPMb__wkwOkyeOk

------------------------------------------------------------

## 目录

1. 登陆
2. 添加用户
3. 更新用户
4. 获取所有用户列表
5. 删除用户
6. 获取分类列表
7. 添加分类
8. 更新分类名称
9. 根据分类ID获取分类
10. 获取商品分页列表
11. 根据name/desc搜索产品分页列表
12. 根据商品ID获取商品
13. 添加商品
14. 更新商品
15. 对商品进行上架/下架处理
16. 上传图片
17. 删除图片
18. 添加角色
19. 获取角色列表
20. 更新角色(给角色设置权限)
21. 获取天气信息
22. 获取位置信息(支持jsonp)

------------------------------------------------------------

## 1. 登录

### 请求URL

------------------------------------------------------------

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

### 返回示例

```json
//成功
{
  "status": 0,
  "data": {
    "user": {
      "_id": "5f7715c0728c35070c604003",
      "username": "admin",
      "create_time": 1601639872615,
      "role": {
        "menus": []
      }
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNzcxNWMwNzI4YzM1MDcwYzYwNDAwMyIsImlhdCI6MTYwMTgxMDAxMiwiZXhwIjoxNjAyNDE0ODEyfQ.LOmpDQyD3nHKTAsiDin_reeO8xhdFWj0C72fZ0tjeCM"
}

//失败
{
    "status": 1,
    "msg": "用户名或密码不正确!"
}

```

------------------------------------------------------------

## 2. 添加用户

### 请求添加用户URL

> <http://localhost:5000/manage/user/add>

------------------------------------------------------------

### 请求添加用户方式

> POST

### 添加用户参数类型

|参数        |是否必选  |类型     |说明 |
|:----------:|:------:|:-------:|:---:|
|username    |Y       |string   |用户名|
|password    |Y       |string   |密码  |
|phone       |N       |string   |手机号|
|email       |N       |string   |邮箱  |
|role_id     |N       |string   |角色ID|

### 添加用户返回示例：

```json
//成功
{
    "status": 0,
    "data": {
        "_id": "5c3b382c82a14446f4ffb647",
        "username": "admin6",
        "password": "d7b79bb6d6f77e6cbb5df2d0d2478361",
        "phone": "13712341234",
        "email": "test@qq.com",
        "create_time": 1547384876804,
        "__v": 0
    }
}
//失败
{
    "status": 1,
    "msg": "此用户已存在"
}
```

## 3. 更新用户

> 此功能服务器未作正确处理!

### 更新用户请求URL

> <http://localhost:5000/manage/user/update>

### 更新用户请求方式

> POST

### 更新用户参数类型

|参数        |是否必选 |类型     |说明  |
|:----------:|:------:|:-------:|:---:|
|_id         |Y       |string   |ID   |
|username    |N       |string   |用户名|
|phone       |N       |string   |手机号|
|email       |N       |string   |邮箱  |
|role_id     |N       |string   |角色ID|
|password    |N       |string   |密码  |

### 更新用户返回示例

```json
//成功:
{
    "status": 0,
    "data": {
        "_id": "5c3b382c82a14446f4ffb647",
        "username": "admin6",
        "password": "d7b79bb6d6f77e6cbb5df2d0d2478361",
        "phone": "13712341234",
        "email": "test@qq.com",
        "create_time": 1547384876804,
        "__v": 0
    }
}
//失败
{
    "status": 1,
    "msg": "此用户已存在"
}
```

## 4. 获取所有用户列表

### 获取所有用户列表请求URL

> <http://localhost:5000/manage/user/list>

### 获取所有用户列表请求方式

> GET

### 获取所有用户列表参数类型:

> 无

### 获取所有用户列表返回示例

```json
{
    "status": 0,
    "data": {
    "users": [
        {
        "_id": "5cb05b4db6ed8c44f42c9af2",
        "username": "test",
        "password": "202cb962ac59075b964b07152d234b70",
        "phone": "123412342134",
        "email": "sd",
        "role_id": "5ca9eab0b49ef916541160d4",
        "create_time": 1555061581734,
        "__v": 0
        },
        {
        "_id": "5cb05b69b6ed8c44f42c9af3",
        "username": "ss22",
        "password": "123",
        "phone": "23343",
        "email": "df",
        "role_id": "5caf5444c61376319cef80a8",
        "create_time": 1555061609666,
        "__v": 0
        }
    ],
    "roles": [
        {
        "menus": [
            "/home",
            "/role",
            "/category",
            "/products",
            "/product",
            "/charts/bar"
        ],
        "_id": "5ca9eaa1b49ef916541160d3",
        "name": "测试",
        "create_time": 1554639521749,
        "__v": 0,
        "auth_time": 1555145863489,
        "auth_name": "admin"
        }
    ]
    }
}
```

## 5. 删除用户
### 请求URL：
	http://localhost:5000/manage/user/delete

### 请求方式：
	POST

### 参数类型:

	|参数		|是否必选 |类型     |说明
	|userId     |Y       |string   |用户ID

### 返回示例：
	{
	  "status": 0
	}

## 6. 获取分类列表

### 请求获取分类列表URL

> <http://localhost:5000/manage/category/list>

### 请求获取分类列表方式

> GET

### 请求获取分类列表参数类型

> 无

### 获取分类列表方式返回示例

```json
{
    "status": 0,
    "data": [
        {
        "_id": "5c2ed631f352726338607046",
        "name": "分类001"
        },
        {
        "_id": "5c2ed647f352726338607047",
        "name": "分类2"
        },
        {
        "_id": "5c2ed64cf352726338607048",
        "name": "1分类3"
        }
    ]
}
```

## 7. 添加分类

### 添加分类URL

> <http://localhost:5000/manage/category/add>

### 添加分类方式

> POST

### 添加分类参数类型

|参数|是否必选|类型|说明|
|:--:|:-----:|:----:|:----:|
|categoryName|Y|string|名称|

### 添加分类返回示例

```json
{
    "status": 0,
    "data": {
    "_id": "5c3ec1534594a00e5877b841",
    "name": "分类9",
    "__v": 0
    }
}
```

## 8. 更新分类名称

### 更新分类URL

> <http://localhost:5000/manage/category/update>

### 更新分类请求方式

> POST

### 更新分类参数类型

|参数|是否必选 |类型|说明|
|:--:|:---:|:----:|:--:|
|categoryId    |Y   |string   |分类的ID|
|categoryName  |Y   |string   |名称|

### 更新分类返回示例

```json
{
    "status": 0
}
```

## 9. 根据分类ID获取分类

### 分类ID获取分类请求URL

> <http://localhost:5000/manage/category/info>

### 分类ID获取分类请求方式

> GET

### 分类ID获取分类参数类型

|参数|是否必选 |类型     |说明|
|:--:|:--:|:---:|:-----:|
|categoryId    |Y       |string   |分类的ID|

### 分类ID获取分类返回示例

```json
{
    "status": 0,
    "data": {
    "_id": "5c2ed631f352726338607046",
    "name": "分类001",
    "__v": 0
    }
}
```
    

## 10. 获取商品分页列表

### 获取商品分页列表请求URL

> <http://localhost:5000/manage/product/list>

### 获取商品分页列表请求方式

> GET

### 获取商品分页列表参数类型

|参数|是否必选|类型|说明|
|:---:|:---:|:---:|:----:|
|pageNum|Y |Number|页码|
|pageSize|Y|Number|每页条目数|

### 获取商品分页列表返回示例

```json

{
    "status": 0,
    "data": {
        "pageNum": 1,
        "total": 12,
        "pages": 3,
        "pageSize": 5,
        "list": [
            {
                "status": 1,
                "imgs": [
                    "image-1559402396338.jpg"
                ],
                "_id": "5ca9e05db49ef916541160cd",
                "name": "联想ThinkPad 翼4809",
                "desc": "年度重量级新品，X390、T490全新登场 更加轻薄机身设计9",
                "price": 65999,
                "categoryId": "5ca9db9fb49ef916541160cc",
                "detail": "<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">想你所需，超你所想！精致外观，轻薄便携带光驱，内置正版office杜绝盗版死机，全国联保两年！</span> 222</p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">联想（Lenovo）扬天V110 15.6英寸家用轻薄便携商务办公手提笔记本电脑 定制【E2-9010/4G/128G固态】 2G独显 内置</span></p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">99999</span></p>\n",
                "__v": 0
            },
            {
                "status": 1,
                "imgs": [
                    "image-1559402448049.jpg",
                    "image-1559402450480.jpg"
                ],
                "_id": "5ca9e414b49ef916541160ce",
                "name": "华硕(ASUS) 飞行堡垒",
                "desc": "15.6英寸窄边框游戏笔记本电脑(i7-8750H 8G 256GSSD+1T GTX1050Ti 4G IPS)",
                "price": 6799,
                "categoryId": "5ca9db8ab49ef916541160cb",
                "detail": "<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">华硕(ASUS) 飞行堡垒6 15.6英寸窄边框游戏笔记本电脑(i7-8750H 8G 256GSSD+1T GTX1050Ti 4G IPS)火陨红黑</span>&nbsp;</p>\n<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">【4.6-4.7号华硕集体放价，大牌够品质！】1T+256G高速存储组合！超窄边框视野无阻，强劲散热一键启动！</span>&nbsp;</p>\n",
                "__v": 0
            },
            {
                "status": 2,
                "imgs": [
                    "image-1559402436395.jpg"
                ],
                "_id": "5ca9e4b7b49ef916541160cf",
                "name": "你不知道的JS（上卷）",
                "desc": "图灵程序设计丛书： [You Don't Know JS:Scope & Closures] JavaScript开发经典入门图书 打通JavaScript的任督二脉",
                "price": 35,
                "categoryId": "5ca9d6c9b49ef916541160bc",
                "detail": "<p style=\"text-align:start;\"><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">图灵程序设计丛书：你不知道的JavaScript（上卷）</span> <span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\"><strong>[You Don't Know JS:Scope &amp; Closures]</strong></span></p>\n<p style=\"text-align:start;\"><span style=\"color: rgb(227,57,60);background-color: rgb(255,255,255);font-size: 12px;\">JavaScript开发经典入门图书 打通JavaScript的任督二脉 领略语言内部的绝美风光</span>&nbsp;</p>\n",
                "__v": 0
            },
            {
                "status": 2,
                "imgs": [
                    "image-1554638240202.jpg"
                ],
                "_id": "5ca9e5bbb49ef916541160d0",
                "name": "美的(Midea) 213升-BCD-213TM",
                "desc": "爆款直降!大容量三口之家优选! *节能养鲜,自动低温补偿,36分贝静音呵护",
                "price": 1388,
                "categoryId": "5ca9d9cfb49ef916541160c4",
                "detail": "<p style=\"text-align:start;\"><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, \"microsoft yahei;\">美的(Midea) 213升 节能静音家用三门小冰箱 阳光米 BCD-213TM(E)</span></p>\n<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;font-family: tahoma, arial, \"Microsoft YaHei\", \"Hiragino Sans GB\", u5b8bu4f53, sans-serif;\">【4.8美的大牌秒杀日】爆款直降!大容量三口之家优选! *节能养鲜,自动低温补偿,36分贝静音呵护! *每天不到一度电,省钱又省心!</span>&nbsp;</p>\n",
                "__v": 0
            },
            {
                "status": 1,
                "imgs": [
                    "image-1554638403550.jpg"
                ],
                "_id": "5ca9e653b49ef916541160d1",
                "name": "美的（Midea）KFR-35GW/WDAA3",
                "desc": "正1.5匹 变频 智弧 冷暖 智能壁挂式卧室空调挂机",
                "price": 2499,
                "categoryId": "5ca9da1ab49ef916541160c6",
                "detail": "<p style=\"text-align:start;\"><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">美的（Midea）正1.5匹 变频 智弧 冷暖 智能壁挂式卧室空调挂机 KFR-35GW/WDAA3@</span></p>\n<p style=\"text-align:start;\"></p>\n<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">【4.8美的大牌秒杀日】提前加入购物车！2299元成交价！前50名下单送赠品加湿型电风扇，赠完即止！8日0点开抢！</span><a href=\"https://sale.jd.com/mall/LKHdqZUIYk.html\" target=\"_blank\"><span style=\"color: rgb(94,105,173);background-color: rgb(255,255,255);font-size: 12px;\">更有无风感柜挂组合套购立减500元！猛戳！！</span></a>&nbsp;</p>\n",
                "__v": 0
            }
        ]
    }
}
```

## 11. 根据Name/desc搜索产品分页列表

### 搜索产品分页列表请求URL

> <http://localhost:5000/manage/product/search?pageNum=1&pageSize=5&productName=T>

### 搜索产品分页列表请求方式

> GET

### 搜索产品分页列表参数类型

|参数|是否必选|类型|说明|
|:------------:|:------:|:-------:|:--------------:|
|pageNum       |Y       |Number   |页码|
|pageSize      |Y       |Number   |每页条目数|
|productName   |N       |String   |根据商品名称搜索|
|productDesc   |N       |String   |根据商品描述搜索|

### 搜索产品分页列表返回示例

```json
{
    "status": 0,
    "data": {
        "pageNum": 1,
        "total": 3,
        "pages": 1,
        "pageSize": 5,
        "list": [
            {
                "status": 1,
                "imgs": [
                    "image-1559402396338.jpg"
                ],
                "_id": "5ca9e05db49ef916541160cd",
                "name": "联想ThinkPad 翼4809",
                "desc": "年度重量级新品，X390、T490全新登场 更加轻薄机身设计9",
                "price": 65999,
                "categoryId": "5ca9db9fb49ef916541160cc",
                "detail": "<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">想你所需，超你所想！精致外观，轻薄便携带光驱，内置正版office杜绝盗版死机，全国联保两年！</span> 222</p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">联想（Lenovo）扬天V110 15.6英寸家用轻薄便携商务办公手提笔记本电脑 定制【E2-9010/4G/128G固态】 2G独显 内置</span></p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">99999</span></p>\n",
                "__v": 0
            },
            {
                "status": 2,
                "imgs": [
                    "image-1554638240202.jpg"
                ],
                "_id": "5ca9e5bbb49ef916541160d0",
                "name": "美的(Midea) 213升-BCD-213TM",
                "desc": "爆款直降!大容量三口之家优选! *节能养鲜,自动低温补偿,36分贝静音呵护",
                "price": 1388,
                "categoryId": "5ca9d9cfb49ef916541160c4",
                "detail": "<p style=\"text-align:start;\"><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, \"microsoft yahei;\">美的(Midea) 213升 节能静音家用三门小冰箱 阳光米 BCD-213TM(E)</span></p>\n<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;font-family: tahoma, arial, \"Microsoft YaHei\", \"Hiragino Sans GB\", u5b8bu4f53, sans-serif;\">【4.8美的大牌秒杀日】爆款直降!大容量三口之家优选! *节能养鲜,自动低温补偿,36分贝静音呵护! *每天不到一度电,省钱又省心!</span>&nbsp;</p>\n",
                "__v": 0
            },
            {
                "status": 1,
                "imgs": [
                    "image-1554638676149.jpg",
                    "image-1554638683746.jpg"
                ],
                "_id": "5ca9e773b49ef916541160d2",
                "name": "联想ThinkPad X1 Carbon",
                "desc": "英特尔酷睿i5 14英寸轻薄笔记本电脑（i5-8250U 8G 256GSSD FHD）黑色",
                "price": 9999,
                "categoryId": "5ca9db78b49ef916541160ca",
                "detail": "<p style=\"text-align:start;\"><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, \"microsoft yahei;\">联想ThinkPad X1 Carbon 2018（09CD）英特尔酷睿i5 14英寸轻薄笔记本电脑（i5-8250U 8G 256GSSD FHD）黑色</span></p>\n<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;font-family: tahoma, arial, \"Microsoft YaHei\", \"Hiragino Sans GB\", u5b8bu4f53, sans-serif;\">年度重量级新品，X390、T490全新登场 更加轻薄机身设计，全面的配置升级，让工作更便捷，让生活更轻松</span><a href=\"https://pro.jd.com/mall/active/2M4o7NTzHH6jEJXS7VbpbTAANQB9/index.html\" target=\"_blank\"><span style=\"color: rgb(94,105,173);background-color: rgb(255,255,255);font-size: 12px;font-family: tahoma, arial, \"Microsoft YaHei\", \"Hiragino Sans GB\", u5b8bu4f53, sans-serif;\">4月9日京东震撼首发，火爆预约</span></a>&nbsp;</p>\n",
                "__v": 0
            }
        ]
    }
}
```

## 12. 根据商品ID获取商品

### 商品ID获取商品请求URL

> <http://localhost:5000/manage/product/info>

### 商品ID获取商品请求方式

> GET

### 商品ID获取商品参数类型

|参数           |是否必选 |类型     |说明|
|:-----------:|:------:|:-------:|:------:|
|productId    |Y       |string   |商品的ID|

### 商品ID获取商品返回示例

```json
{
    "status": 0,
    "data": {
    "status": 1,
    "imgs": [
        "image-1559402396338.jpg"
    ],
    "_id": "5ca9e05db49ef916541160cd",
    "name": "联想ThinkPad 翼4809",
    "desc": "年度重量级新品，X390、T490全新登场 更加轻薄机身设计9",
    "price": 65999,
    "categoryId": "5ca9db9fb49ef916541160cc",
    "detail": "<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">想你所需，超你所想！精致外观，轻薄便携带光驱，内置正版office杜绝盗版死机，全国联保两年！</span> 222</p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">联想（Lenovo）扬天V110 15.6英寸家用轻薄便携商务办公手提笔记本电脑 定制【E2-9010/4G/128G固态】 2G独显 内置</span></p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">99999</span></p>\n",
    }
}
```

## 13. 添加商品

### 添加商品请求URL

> <http://localhost:5000/manage/product/add>

### 添加商品请求方式

> POST

### 添加商品参数类型

|参数           |是否必选 |类型     |说明|
|:------------:|:------:|:-------:|:----:|
|categoryId    |Y       |string   |分类ID|
|name          |Y       |string   |商品名称|
|desc          |N       |string   |商品描述|
|price         |N       |string   |商品价格|
|detail        |N       |string   |商品详情|
|imgs          |N       |array   |商品图片名数组|

### 添加商品返回示例

```json
{
    "status": 0,
    "data": {
        "status": 1,
        "imgs": [
            "image-1559467198366.jpg"
        ],
        "_id": "5cf394d29929a304dcc0c6eb",
        "name": "商品A",
        "desc": "一个笔记本",
        "price": 11111,
        "detail": "<p><strong>abc</strong></p>\n",
        "categoryId": "5ca9db78b49ef916541160ca",
        "__v": 0
    }
}
```

## 14. 更新商品

### 更新商品请求URL

> <http://localhost:5000/manage/product/update>

### 更新商品请求方式

> POST

### 更新商品参数类型

|参数           |是否必选 |类型     |说明|
|:------------:|:------:|:-------:|:----:|
|_id           |Y       |string   |商品ID|
|categoryId    |Y       |string   |分类ID|
|name          |Y       |string   |商品名称|
|desc          |N       |string   |商品描述|
|price         |N       |string   |商品价格|
|detail        |N       |string   |商品详情|
|imgs          |N       |array   |商品图片名数组|

### 更新商品返回示例

```json
{
    "status": 0
}
```

## 15. 对商品进行上架/下架处理

### 上架/下架处理请求URL

> <http://localhost:5000/manage/product/updateStatus>

### 上架/下架处理请求方式

> POST

### 上架/下架处理参数类型

|参数|是否必选 |类型|说明|
|:--:|:------:|:--:|:---:|
|productId|Y|string|商品名称|
|status|Y|number|商品状态值|

### 上架/下架处理返回示例

```json
{
    "status": 0
}
```

## 16. 上传图片

### 上传图片请求URL

> <http://localhost:5000/manage/img/upload>

### 上传图片请求方式

> POST

### 上传图片参数类型

|参数|是否必选 |类型     |说明|
|:--:|:------:|:--:|:---:|
|image  |Y       |文件   |图片文件|

### 上传图片返回示例

```json
{
    "status": 0,
    "data": {
        "name": "image-1559466841118.jpg",
        "url": "http://localhost:5000/upload/image-1559466841118.jpg"
    }
}
```

## 17. 删除图片

### 删除图片请求URL

> <http://localhost:5000/manage/img/delete>

### 删除图片请求方式

> POST

### 删除图片参数类型

|参数|是否必选 |类型  |说明      |
|:--:|:------:|:----:|:-------:|
|name|Y       |string|图片文件名|

### 删除图片返回示例

```json
{
    "status": 0
}
```

## 18. 添加角色

### 添加角色请求URL

> <http://localhost:5000/manage/role/add>

### 添加角色请求方式

> POST

### 添加角色参数类型

|参数        |是否必选 |类型      |说明   |
|:----------:|:------:|:-------:|:-----:|
|roleName    |Y       |string   |角色名称|

### 添加角色返回示例

```json
{
    "status": 0,
    "data": {
        "menus": [],
        "_id": "5cf39a319929a304dcc0c6ec",
        "name": "角色x",
        "create_time": 1559468593702,
        "__v": 0
    }
}
```

## 19. 获取角色列表

### 获取角色列表请求URL

> <http://localhost:5000/manage/role/list>

### 获取角色列表请求方式

> GET

### 获取角色列表参数类型:

> 无

### 获取角色列表返回示例

```json
{
    "status": 0,
    "data": [
        {
            "menus": [
                "/role",
                "/charts/bar",
                "/home",
                "/category"
            ],
            "_id": "5ca9eaa1b49ef916541160d3",
            "name": "测试",
            "create_time": 1554639521749,
            "__v": 0,
            "auth_time": 1558679920395,
            "auth_name": "test007"
        },
        {
            "menus": [
                "/role",
                "/charts/bar",
                "/home",
                "/charts/line",
                "/category",
                "/product",
                "/products"
            ],
            "_id": "5ca9eab0b49ef916541160d4",
            "name": "经理",
            "create_time": 1554639536419,
            "__v": 0,
            "auth_time": 1558506990798,
            "auth_name": "test008"
        },
        {
            "menus": [
                "/home",
                "/products",
                "/category",
                "/product",
                "/role"
            ],
            "_id": "5ca9eac0b49ef916541160d5",
            "name": "角色1",
            "create_time": 1554639552758,
            "__v": 0,
            "auth_time": 1557630307021,
            "auth_name": "admin"
        }
    ]
}
```

## 20. 更新角色(给角色设置权限)

### 更新角色请求URL

> <http://localhost:5000/manage/role/update>

### 更新角色请求方式

> POST

### 更新角色参数类型
  
|参数         |是否必选 |类型      |说明      |
|:-----------:|:------:|:-------:|:--------:|
|_id          |Y       |string   |角色ID    |
|menus        |Y       |array    |权限key数组|
|auth_time    |Y       |number   |权限时间   |
|auth_name    |Y       |string   |权限人姓名 |

### 更新角色返回示例

```json
{
    "status": 0,
    "data": {
        "menus": [
            "/role",
            "/charts/bar",
            "/home",
            "/category",
            "/user"
        ],
        "_id": "5ca9eaa1b49ef916541160d3",
        "name": "测试",
        "create_time": 1554639521749,
        "__v": 0,
        "auth_time": 1559469116470,
        "auth_name": "admin"
    }
}
```

## 21. 获取天气信息

### 获取天气信息请求URL

> <http://wthrcdn.etouch.cn/weather_mini?city=北京>

### 获取天气信息请求方式

> GET

### 获取天气信息参数类型

|参数        |是否必选 |类型      |说明      |
|:----------:|:------:|:-------:|:--------:|
|city        |Y       |string   |城市名称   |

### 获取天气信息返回示例

```json
{
    "data": {
        "yesterday": {
            "date": "9日星期五",
            "high": "高温 21℃",
            "fx": "南风",
            "low": "低温 10℃",
            "fl": "<![CDATA[1级]]>",
            "type": "霾"
        },
        "city": "北京",
        "forecast": [
            {
                "date": "10日星期六",
                "high": "高温 23℃",
                "fengli": "<![CDATA[2级]]>",
                "low": "低温 15℃",
                "fengxiang": "南风",
                "type": "霾"
            },
            {
                "date": "11日星期天",
                "high": "高温 18℃",
                "fengli": "<![CDATA[3级]]>",
                "low": "低温 7℃",
                "fengxiang": "北风",
                "type": "阴"
            },
            {
                "date": "12日星期一",
                "high": "高温 18℃",
                "fengli": "<![CDATA[2级]]>",
                "low": "低温 6℃",
                "fengxiang": "西风",
                "type": "多云"
            },
            {
                "date": "13日星期二",
                "high": "高温 19℃",
                "fengli": "<![CDATA[2级]]>",
                "low": "低温 6℃",
                "fengxiang": "北风",
                "type": "多云"
            },
            {
                "date": "14日星期三",
                "high": "高温 14℃",
                "fengli": "<![CDATA[2级]]>",
                "low": "低温 5℃",
                "fengxiang": "东南风",
                "type": "晴"
            }
        ],
        "ganmao": "感冒低发期，天气舒适，请注意多吃蔬菜水果，多喝水哦。",
        "wendu": "19"
    }
}
```

## 22. 获取位置信息(支持jsonp)

### 获取位置请求地址

> <http://whois.pconline.com.cn/ipJson.jsp>

### 获取位置请求方式

> get

### 获取位置请求方式参数类型

|参数        |是否必选 |类型      |说明      |
|:----------:|:------:|:-------:|:--------:|
|jsonp       |N       |bool     |默认jsonp  |
|json        |N       |bool     |json      |

### 获取位置返回示例

```json
{
    "ip": "42.49.109.146",
    "pro": "北京市",
    "proCode": "43xxxx",
    "city": "北京市",
    "cityCode": "4343xx",
    "region": "",
    "regionCode": "0",
    "addr": "北京市 联通",
    "regionNames": "",
    "err": ""
}
```
