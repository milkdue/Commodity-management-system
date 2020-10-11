import React, {Component} from 'react';
import { Carousel } from 'antd';
import '../css/home.less';

export default class Home extends Component{


    render(){
        return (
            <div> 
                <Carousel className="autoplay" autoplay>
                    <div>
                        <h2 className="autoplay">欢迎使用商品管理系统</h2>
                    </div>
                    <div>
                        <h2 className="autoplay">欢迎使用商品管理系统</h2>
                    </div>
                    <div>
                        <h2 className="autoplay">欢迎使用商品管理系统</h2>
                    </div>
                    <div>
                        <h2 className="autoplay">欢迎使用商品管理系统</h2>
                    </div>
                </Carousel>
          </div>
        )
    }
}