import React, {Component} from 'react';
import {Card, Button, Table, Modal, Form, Input, Select, message} from 'antd';
import {UserAddOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import dayjs from 'dayjs';
import {reqUserList, reqAddUser, reqDeleteUser, reqUpdateUser} from '../../api/index.js';
const {Option} = Select;


export default class User extends Component{
    state = {
        isLoading: true, // 加载
        addVisible: false, // 添加用户模态框
        roles: [], // 所有角色名
        users: [], // 所有用户信息
        user: [], // 数据回显指定用户
        type: 'add', // 判断是修改还是更新
    }

    componentDidMount(){
        this.getUserList()
    }


    componentDidUpdate(){
        if(this.state.user.length !== 0){
            if(this.state.type !== 'add'){
                if (this.formRef) {
                    const {username, role_id, phone, email} = this.state.user;
                    this.formRef.setFieldsValue({
                        username,
                        email,
                        role_id,
                        phone
                    })
                }
            }
        }
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
    showAddModal = (item) => {
        const {_id, username, role_id, phone, email} = item;
        if(_id){
            this.setState({user: {_id ,username, role_id, phone, email}, type: 'update'})
        }else{
            if(this.formRef){
                this.formRef.resetFields();//重置表单
            }
            this.setState({type: 'add'});
        }
        this.setState({addVisible: true});
    };

    handleAddOk = () => {
        // 表单验证
        this.formRef.validateFields()
            .then(value => {
                if(this.state.type === 'add'){
                    reqAddUser(value).then(result => {
                        if(result.status === 0){
                            message.success('添加成功!', 1);
                            this.getUserList();
                            if(this.formRef){
                                this.formRef.resetFields();//重置表单
                            }
                            this.setState({addVisible: false});
                        }else{
                            message.warning(result.msg + '!', 1);
                        }
                    })
                }else{
                    const {_id} = this.state.user;
                    const {username, email, phone, role_id, password} = value;
                    this.flag = true;
                    reqUpdateUser({_id, username, phone, password, email, role_id}).then(value => {
                        if(value.status === 0){
                            message.success('修改成功!', 1);
                            this.getUserList();
                            if(this.formRef){
                                this.formRef.resetFields();//重置表单
                            }
                            this.setState({addVisible: false});
                        }else{
                            message.error('修改失败,请稍后重试!', 1);
                            this.setState({addVisible: false});
                        }
                    })
                }
            })
            .catch(error => message.error('请检查输入项!', 1))
    };

    handleAddCancel = () => {
        this.formRef.resetFields();//重置表单
        this.setState({addVisible: false});
    };


    confirm = (item) => {
        Modal.confirm({
          title: '用户删除',
          icon: <ExclamationCircleOutlined />,
          content: '此操作不可逆!',
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            this.deleteUserInfo(item._id);
          },
          onCancel() {
            message.loading('取消', 0.5);
          },
        });
    }

    deleteUserInfo = async (id) => {
        let result = await reqDeleteUser(id);
        if(result.status === 0){
            message.success('删除成功!', 1);
            this.getUserList();
        }else{
            message.error('删除失败!', 1);
        }
    }

    render(){
        const {isLoading, addVisible, roles, users, type} = this.state;
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
                render: (item) => {
                    return (
                        <div>
                            <Button type="link" onClick={() => {this.showAddModal(item)}}>修改</Button>
                            <Button type="link" onClick={() => {this.confirm(item)}}>删除</Button>
                        </div>
                    )
                }
            },
        ];
        return (
            <div>
                <Modal
                    title={type === 'add' ? '用户添加' : '用户修改'}
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
                                ]
                            }
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
                            <Select placeholder="请选择一个角色">
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