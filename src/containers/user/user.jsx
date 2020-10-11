import React, {Component} from 'react';
import {Card, Button, Table, Modal, Form, Input, Select, message} from 'antd';
import {UserAddOutlined} from '@ant-design/icons';
import dayjs from 'dayjs';
import {reqUserList, reqAddUser} from '../../api/index.js';
const {Option} = Select;


export default class User extends Component{
    state = {
        isLoading: true, // 加载
        addVisible: false, // 添加用户模态框
        roles: [], // 所有角色名
        users: [] // 所有用户信息
    }

    componentDidMount(){
        this.getUserList()
    }
    // 获取所有用户列表
    getUserList = async () => {
        let result = await reqUserList();
        if(result.status === 0){
            let {users, roles} = result.data;
            this.setState({roles, users: users.reverse()})
        }else{
            message.error('获取列表失败,请刷新!', 1);
        }
        this.setState({isLoading: false});
    }
    // 
    showAddModal = () => {
        this.setState({
            addVisible: true,
        });
    };

    handleAddOk = () => {
        // 表单验证
        this.formRef.validateFields()
        .then(value => {
            reqAddUser(value).then(result => {
                if(result.status === 0){
                    message.success('添加成功!', 1);
                    this.getUserList()
                }else{
                    message.warning(result.msg + '!', 1);
                }
            })
        })
        .catch(error => message.error(error.message, 1))
        this.setState({
            addVisible: false,
        });
    };

    handleAddCancel = () => {
        this.setState({
            addVisible: false,
        });
    };
    // 选择框
    handleChange = () => {

    }

    render(){
        const {isLoading, addVisible, roles, users} = this.state;
        const columns = [
            {
                title: '用户名',
                dataIndex: 'username',
                align: 'center',
                key: 'username',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                align: 'center',
                key: 'email',
            },
            {
                title: '电话',
                dataIndex: 'phone',
                align: 'center',
                key: 'phone',
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                align: 'center',
                key: 'create_time',
                render: time => dayjs(time).format('YYYY-MM-DD HH:mm:ss')
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                align: 'center',
                key: 'roleName',
                render: id => roles.find((item => item._id === id)).name
            },
            {
                title: '操作',
                key: 'operation',
                align: 'center',
                render: () => {
                    return (
                        <div>
                            <Button type="link">修改</Button>
                            <Button type="link">删除</Button>
                        </div>
                    )
                }
            },
        ];
        return (
            <div>
                <Modal
                    title="用户添加"
                    visible={addVisible}
                    onOk={this.handleAddOk}
                    onCancel={this.handleAddCancel}
                    okText="确认"
                    cancelText="取消"
                >
                    <Form 
                            name="normal_login" 
                            className="login-form" 
                            labelCol={{xs: 8, md: 6, lg: 4}}
                            ref={(form) => {this.formRef = form}}
                        >
                        <Form.Item
                            name="username"
                            label="用户名"
                            rules={[
                                {
                                    required: true,
                                    message: '用户名不能为空!'
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
                                placeholder="请输入用户名"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="密码"
                            rules={[
                                {
                                    required: true,
                                    message: '密码不能为空!'
                                },
                                {
                                    min: 5,
                                    message: '密码必须大于等于5位!'
                                },
                                {
                                    max: 18,
                                    message: '密码必须小于等于18位!'
                                },
                                {
                                    pattern: /^\w+$/,
                                    message: '密码必须由字母数字下划线组成!'
                                }
                            ]}
                        >
                            <Input
                                placeholder="请输入密码"
                                type="password"
                            />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            label="电话号码"
                            rules={[
                                {
                                    required: true,
                                    message: '电话号码不能为空!'
                                },
                                {
                                    pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
                                    message: '请输入正确格式的电话号码!',
                                }
                            ]}
                        >
                            <Input
                                placeholder="请输入电话号码"
                            />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="邮箱"
                            rules={[
                                {
                                    required: true,
                                    message: '邮箱不能为空!'
                                },
                                {
                                    type: 'email',
                                    message: '请输入正确格式的邮箱!'
                                }
                            ]}
                        >
                            <Input
                                type="email"
                                placeholder="请输入邮箱"
                            />
                        </Form.Item>
                        <Form.Item
                            name="role_id"
                            label="角色"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择一个角色!'
                                }
                            ]}
                        >
                            <Select onChange={this.handleChange} placeholder="请选择一个角色">
                                {
                                    roles.map((item) => (<Option value={item._id} key={item._id}>{item.name}</Option>))
                                }
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
                <Card title={<Button type="primary" onClick={this.showAddModal}><UserAddOutlined />创建用户</Button>}>
                    <Table dataSource={users} columns={columns} bordered rowKey="_id" loading={isLoading}/>
                </Card>
            </div>
        )
    }
}