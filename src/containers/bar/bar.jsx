import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';



let xAxisData = [];
let data1 = [];
let data2 = [];
for (var i = 1; i < 31; i++) {
    xAxisData.push(i + '日');
    data1.push((Math.random() * 20));
    data2.push((Math.random() * 100) - 50);
}


export default class Bar extends Component{

    getOption = () => {
        return {
            title: {
                text: ''
            },
            legend: {
                data: ['销量', '利润']
            },
            toolbox: {
                // y: 'bottom',
                feature: {
                    magicType: {
                        type: ['stack', 'tiled']
                    },
                    dataView: {},
                    saveAsImage: {
                        pixelRatio: 2
                    }
                }
            },
            tooltip: {},
            xAxis: {
                data: xAxisData,
                splitLine: {
                    show: false
                }
            },
            yAxis: {
            },
            series: [{
                name: '销量',
                type: 'bar',
                data: data1,
                animationDelay: function (idx) {
                    return idx * 10;
                }
            }, {
                name: '利润',
                type: 'bar',
                data: data2,
                animationDelay: function (idx) {
                    return idx * 10 + 100;
                }
            }],
            animationEasing: 'elasticOut',
            animationDelayUpdate: function (idx) {
                return idx * 5;
            }
        }
    }

    render(){
        return (
            <ReactEcharts option={this.getOption()} style={{width: '100%', height: '100%'}}/>
        )
    }
}