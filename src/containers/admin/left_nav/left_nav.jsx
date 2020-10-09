import React, { Component } from 'react';
import {Menu} from 'antd';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import menuList from '../../../config/menu-config.js';
import {createSaveTitleAction} from '../../../redux/actions/create_save_title_action';
import logo from '../../../static/imgs/logo.png';
import './css/left_nav.less';
const { SubMenu } = Menu;

@connect(
    state => ({
        title: state
    }),
    {
        saveTitle: createSaveTitleAction
    }
)
@withRouter
class LeftNav extends Component {
    createMenuList = (list) => {
        return list.map((item) => {
            if(!item.children){
                return (
                    <Menu.Item onClick={() => {this.props.saveTitle(item.title)}} key={item.key} icon={<item.icon/>}>
                        <Link to={item.path}>
                            {item.title}
                        </Link>
                    </Menu.Item>
                )
            }else{
                return (
                    <SubMenu key={item.key} icon={<item.icon />} title={item.title}>
                        {this.createMenuList(item.children)}
                    </SubMenu>
                )
            }
        })
    }
    render() {
        return (
            <div>
                <header>
                    <img src={logo} alt="logo"/>
                    <span>商品管理系统</span>
                </header>
                <Menu
                    selectedKeys={this.props.location.pathname.split('/').slice(2)} // 默认选中 根据key 可传数组 或单个key
                    // defaultOpenKeys={} // 初始展开的 SubMenu 菜单项 key或者数组
                    mode="inline" //菜单类型
                    theme="dark" // 主题颜色有亮和暗两种
                    defaultOpenKeys={this.props.location.pathname.split('/').slice(2)}// 默认打开的导航 根据key 传数组
                >

                {
                    this.createMenuList(menuList)
                }
                </Menu>
            </div>
        )
    }
}

export default LeftNav;
