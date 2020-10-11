import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';


export default class Line extends Component{
    getOption = () => {
        return {
            xAxis: {
                type: 'category',
                data: ['商务服饰', '洗护用品', '汽车用品', '宠物用品', '奢华箱包', '女士护肤', '智能手机', '智能手表', '笔记本电脑', '台式电脑', '耳机音响']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [335, 310, 124, 100, 50, 95, 300, 251, 147, 102, 748],
                type: 'line',
                smooth: true
            }]
        }
    }
    render(){
        return (
            <ReactEcharts option={this.getOption()} style={{width: '100%', height: '100%'}}/>
        )
    }
}