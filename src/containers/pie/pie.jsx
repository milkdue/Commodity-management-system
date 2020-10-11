import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';


export default class Pie extends Component{

    getOption = () => {
        return {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 10,
                data: ['商务服饰', '洗护用品', '汽车用品', '宠物用品', '奢华箱包', '女士护肤', '智能手机', '智能手表', '笔记本电脑', '台式电脑', '耳机音响']
            },
            series: [
                {
                    name: '销量',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '30%'],
        
                    label: {
                        position: 'inner'
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {value: 335, name: '办公用品', selected: true},
                        {value: 679, name: '生活用品'},
                        {value: 1548, name: '电子设备'}
                    ]
                },
                {
                    name: '销量',
                    type: 'pie',
                    radius: ['40%', '55%'],
                    label: {
                        formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                        backgroundColor: '#eee',
                        borderColor: '#aaa',
                        borderWidth: 1,
                        borderRadius: 4,
                        // shadowBlur:3,
                        // shadowOffsetX: 2,
                        // shadowOffsetY: 2,
                        // shadowColor: '#999',
                        // padding: [0, 7],
                        rich: {
                            a: {
                                color: '#999',
                                lineHeight: 22,
                                align: 'center'
                            },
                            // abg: {
                            //     backgroundColor: '#333',
                            //     width: '100%',
                            //     align: 'right',
                            //     height: 22,
                            //     borderRadius: [4, 4, 0, 0]
                            // },
                            hr: {
                                borderColor: '#aaa',
                                width: '100%',
                                borderWidth: 0.5,
                                height: 0
                            },
                            b: {
                                fontSize: 16,
                                lineHeight: 33
                            },
                            per: {
                                color: '#eee',
                                backgroundColor: '#334455',
                                padding: [2, 4],
                                borderRadius: 2
                            }
                        }
                    },
                    data: [
                        {value: 335, name: '商务服饰'},
                        {value: 310, name: '洗护用品'},
                        {value: 124, name: '汽车用品'},
                        {value: 100, name: '宠物用品'},
                        {value: 50, name: '奢华箱包'},
                        {value: 95, name: '女士护肤'},
                        {value: 300, name: '智能手机'},
                        {value: 251, name: '智能手表'},
                        {value: 147, name: '笔记本电脑'},
                        {value: 102, name: '台式电脑'},
                        {value: 748, name: '耳机音响'}
                    ]
                }
            ]
        }
    }
    render(){
        return (
            <ReactEcharts option={this.getOption()} style={{width: '100%', height: '100%'}}/>
        )
    }
}