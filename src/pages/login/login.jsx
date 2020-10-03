import React, {Component} from 'react';
import { Form, Input, Button, message} from 'antd';
// 引入icon图标
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from './imgs/logo.png';
import './css/login.less';

export default class Login extends Component{
    onFinish = (value) => {
        // console.log(value);
        // 成功跳转
        message.success('成功!');
    }

    // 失败的回调
    onFinishFailed = ({ values, errorFields, outOfDate }) => {
        // console.log(values, errorFields, outOfDate);
        errorFields.forEach(element => {
            message.error(element.errors);
        });
    }

    pwdValidator = (rule, value, callback) => {
        /*
        密码合法性
            1. 必须输入 
            2. 必须大于等于6位
            3. 必须小于等于18位
            4. 必须是字母、数字、下划线组成
        */
        // console.log(rule, value, callback);
        if(!value){
            callback('密码不能为空!');
        }else if(value.length < 6){
            callback('密码必须大于等于6位!');
        }else if(value.length > 18){
            callback('密码必须小于等于18位!');
        }else if(!(/^\w+$/).test(value)){
            callback('密码必须由字母数字下划线组成!');
        }
        callback();
    }
    render(){
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