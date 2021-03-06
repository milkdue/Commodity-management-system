import React,{Component} from 'react';
import {Button, message, Modal} from 'antd';
import {FullscreenOutlined, FullscreenExitOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';
import screenfull from 'screenfull';
import {withRouter} from 'react-router-dom';
import {deleteUserInfoAction} from '../../../redux/actions/create_or_delete_user_info_action.js';
import {dateFormat} from '../../../myFunction/time_format.js';
import {imgUrl} from '../../../myFunction/accord_weather_to_img';
import {reqLocal, reqWeather} from '../../../api/index.js';
import menuList from '../../../config/menu-config.js';
import './css/header.less';

const { confirm } = Modal;

@connect(
    state => ({
        userInfo: state.userInfo,
        title: state.title
    }),
    {
        deleteUserInfo: deleteUserInfoAction
    }
)
@withRouter
class Header extends Component{
    state = {
        isFullScreen: false, // 是否全屏
        time: dateFormat("YYYY-mm-dd HH:MM:SS", new Date()), // 时间格式化
        local: '', // 位置
        weatherUrl: '', // 天气图片url
        weatherType: '', // 天气类型
        temperature: '', // 温度状况
        title: '' // 标题
    }

    timerId = 0;

    componentDidMount(){
        // 发请求获取位置
        reqLocal()
            .then(result => {
                console.log(result)
                this.setState({local: result});
                // 发请求获取天气
                let placeReg = /(\S+)市$/;
                let place = placeReg.exec(result)[1];
                reqWeather(place)
                    .then(result => {
                        let {type, low, high} = result.data.data.forecast[0];
                        let temperatureReg = /(\d+℃)$/;
                        low = parseInt(temperatureReg.exec(low)[1]);
                        high = temperatureReg.exec(high)[1];
                        this.setState({weatherUrl: imgUrl(type), weatherType: type, temperature: low + '~' + high});
                        // console.log(result.data.data.forecast[0])
                    })
                    .catch(reason => console.log(reason));
            })
            .catch(reason => message.error(reason, 1));
        // 绑定监听
        screenfull.on('change', this.changeFullState);
        // 修改状态
        this.timerId = setInterval(() => {
            let time = dateFormat("YYYY-mm-dd HH:MM:SS", new Date());
            this.setState({time});
        }, 1000);

        this.getTitle();
    }

    componentWillUnmount(){
        // 解除监听
        screenfull.off('change', this.changeFullState);
        // 清除定时器
        clearInterval(this.timerId);
    }

    // 获取标题
    getTitle = () => {
        let key = this.props.location.pathname.split('/');
        if(key.indexOf('product') !== -1) key = 'product';
        else key = key[key.length - 1];
        menuList.forEach((item) => {
            if(!item.children){
                if(item.key === key) this.setState({title: item.title})
            }else{
                let temp = item.children.find((children) => {
                    return children.key === key;
                })

                if(temp) this.setState({title: temp.title})
            }
        })
        
    }
    // 改变全屏状态
    changeFullState = () => {
        let isFullScreen = !this.state.isFullScreen;
        this.setState({isFullScreen})
    }
    // 退出登录
    loginOut = () => {
        confirm({
            title: '您确定要退出登录吗?',
            icon: <ExclamationCircleOutlined />,
            content: '若退出需要重新登录!',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                this.props.deleteUserInfo();
            },
            onCancel() {
              message.loading('取消', 0.5);
            },
          });
        
    }

    // 进度条
    inOrOutFullScreen = () => {
        screenfull.toggle();
    }
    render(){
        const {username} = this.props.userInfo.user;
        const {isFullScreen, time, local, weatherUrl, weatherType, temperature} = this.state;
        return (
            <div className="header">
                <div className="header-top">
                    <Button size="small" className="isfullscreen" onClick={this.inOrOutFullScreen}>
                        {
                            isFullScreen ? <FullscreenExitOutlined/> : <FullscreenOutlined/>
                        }
                    </Button>
                    <span>欢迎，{username}</span>
                    <Button type="link" onClick={this.loginOut}>退出</Button>
                </div>
                <div className="header-bottom">
                    <section className="header-bottom-left">{this.props.title || this.state.title}</section>
                    <div className="header-bottom-right">
                        <span>{time}</span>
                        <span className="local">{local}</span>
                        <img src={weatherUrl} alt="天气"/>
                        <span className="weather">{weatherType}</span>
                        <span>{temperature}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;