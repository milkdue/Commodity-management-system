// 多云 晴 小雨 中雨 大雨 阴 雷阵雨 阵雨
let urls = [
    'http://api.map.baidu.com/images/weather/day/duoyun.png', 
    'http://api.map.baidu.com/images/weather/day/qing.png', 
    'http://api.map.baidu.com/images/weather/day/xiaoyu.png',
    'http://api.map.baidu.com/images/weather/day/zhongyu.png',
    'http://api.map.baidu.com/images/weather/day/dayu.png',
    'http://api.map.baidu.com/images/weather/day/yin.png',
    'http://api.map.baidu.com/images/weather/day/leizhenyu.png',
    'http://api.map.baidu.com/images/weather/day/zhenyu.png'
];

export function imgUrl(type){
    switch (type) {
        case '多云':
            return urls[0];
        case '晴':
            return urls[1];
        case '小雨':
            return urls[2];
        case '中雨':
            return urls[3];
        case '大雨':
            return urls[4];
        case '阴':
            return urls[5];    
        case '雷阵雨':
            return urls[6]; 
        case '雷阵雨':
            return urls[7];
        default:
            return urls[1];
    }
}