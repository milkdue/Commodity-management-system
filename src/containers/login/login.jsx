import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import { Form, Input, Button, message} from 'antd';
// 引入icon图标
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {createUserInfoAction} from '../../redux/actions/create_or_delete_user_info_action.js';
import {reqLogin} from '../../api/index.js'
import logo from './imgs/logo.png';
import './css/login.less';


@connect(
    state => ({userInfo: state.userInfo}),
    {
        createUserInfo: createUserInfoAction
    }
)
class Login extends Component{
    onFinish = async (userInformation) => {
        // console.log(userInformation);
        // userInformation = {username: "133344", password: "222222222222"}
        // 成功发请求
        const {username, password} = userInformation;
        let result = await reqLogin(username, password);
        // console.log(result);
        /**
         * data:
                {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNzcxNWMwNzI4YzM1MDcwYzYwNDAwMyIsImlhdCI6MTYwMTg3MjczMCwiZXhwIjoxNjAyNDc3NTMwfQ.V2Izfej62ZifqJIbsaH9tKLwlqCgueSd2BsH_WLt_Xk"
                user:
                    {create_time: 1601639872615
                    role: {menus: Array(0)}
                    username: "admin"
                    _id: "5f7715c0728c35070c604003"}
                }
         */
        if(result.status === 1){
            message.warning(result.msg, 1);
        }else{
            // 将userInformation放入redux进行管理
            this.props.createUserInfo(result.data)
            // 跳转admin
            this.props.history.push('/admin');
        }
    }

    // 失败的回调
    onFinishFailed = ({ values, errorFields, outOfDate }) => {
        // console.log(values, errorFields, outOfDate);
        errorFields.forEach(element => {
            message.warning(element.errors, 1);
        });
    }

    pwdValidator = (rule, value, callback) => {
        /*
        密码合法性
            1. 必须输入 
            2. 必须大于等于5位
            3. 必须小于等于18位
            4. 必须是字母、数字、下划线组成
        */
        // console.log(rule, value, callback);
        if(!value){
            callback('密码不能为空!');
        }else if(value.length < 5){
            callback('密码必须大于等于5位!');
        }else if(value.length > 18){
            callback('密码必须小于等于18位!');
        }else if(!(/^\w+$/).test(value)){
            callback('密码必须由字母数字下划线组成!');
        }
        callback();
    }
    render(){
        // 读取store管理的isLogin
        const {isLogin} = this.props.userInfo;
        if(isLogin){
            return <Redirect to="/admin"/>
        }else{
            return (
                <div className="login">
                    <header>
                        <img src={logo} alt="logo"/>
                        <h1>商品管理系统</h1>
                    </header>
                    <section>
                        <h1>用户登录</h1>
                        <Form 
                            name="normal_login" 
                            className="login-form" 
                            // 表单默认值，只有初始化以及重置时生效 obj
                            initialValues={{ remember: true }}
                            // 提交表单成功的回调
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}
                        >
                        <Form.Item
                            name="username"
                            /*
                            用户名合法性
                                1. 必须输入 
                                2. 必须大于等于4位
                                3. 必须小于等于12位
                                4. 必须是字母、数字、下划线组成
                            */
                            rules={[
                                {
                                    required: true,
                                    message: '用户名不能为空!',
                                },
                                {
                                    min: 4,
                                    message: '用户名必须大于等于4位!'
                                },
                                {
                                    max: 12,
                                    message: '用户名必须小于等于12位!'
                                },
                                {
                                    pattern: /^\w+$/,
                                    message: '用户名必须由字母数字下划线组成!'
                                }
                            ]}
                        >
                            <Input 
                                style={{color: 'rgba(0, 0, 0, .25)'}}
                                prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" 
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    // 自定义校验器
                                    validator: this.pwdValidator
                                }
                            ]}
                        >
                            <Input
                                style={{color: 'rgba(0, 0, 0, .25)'}}
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
    
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                            </Button>
                        </Form.Item>
                        </Form>
                    </section>
                </div>
            )
        }
        
    }
}

export default Login;