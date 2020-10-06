import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Layout} from 'antd';
import Header from './header/header.jsx';
import Home from '../../components/home/home.jsx';
import Category from '../category/category.jsx';
import Product from '../product/product.jsx';
import User from '../user/user.jsx';
import Role from '../role/role.jsx';
import Bar from '../bar/bar.jsx';
import Line from '../line/line.jsx';
import Pie from '../pie/pie.jsx';
import './css/admin.less';

const { Footer, Sider, Content } = Layout;
@connect(
    state => ({userInfo: state.userInfo}),
    {
        
    }
)
class Admin extends Component{
    render(){
        const {isLogin, user} = this.props.userInfo;
        if(isLogin){
            return (
                <Layout className="admin">
                    <Sider className="sider">Sider</Sider>
                    <Layout>
                        <Header />
                        <Content className="content">
                            <Switch>
                                <Route path="/admin/home" component={Home}/>
                                <Route path="/admin/production/category" component={Category}/>
                                <Route path="/admin/production/product" component={Product}/>
                                <Route path="/admin/user" component={User}/>
                                <Route path="/admin/role" component={Role}/>
                                <Route path="/admin/charts/bar" component={Bar}/>
                                <Route path="/admin/charts/line" component={Line}/>
                                <Route path="/admin/charts/pie" component={Pie}/>
                                <Redirect to="/admin/home"/>
                            </Switch>
                        </Content>
                        <Footer className="footer">请使用谷歌浏览器，以获取更好的用户体验！</Footer>
                    </Layout>
                </Layout>
            )
        }else{
            return <Redirect to="/login"/>
        }
        
    }
}
export default Admin;