import React, {Component} from 'react';
import {Card, Button, Table, Modal, Form, Input, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {reqAddRole, reqRoleList} from '../../api/index.js';
  
export default class Role extends Component{

    state = {
        visible: false,
        roleList: []
    };

    componentDidMount(){
        this.getRoleList();
    }
    // 请求角色列表
    getRoleList = async () => {
        let result = await reqRoleList();
        if(result.status === 0){
            console.log(result.data)
            this.setState({roleList: result.data});
        }else{
            message.error('获取角色列表失败,请刷新后重试!', 1);
        }
    }
    // 展示新增角色模态框
    showAddRole = () => {
        this.setState({visible: true});
    }
    // 展示设置权限模态框
    showAuth = () => {

    }
    // 点击新增角色确定回调
    handleAddOk = () => {
        // 表单验证
        this.formRef.validateFields()
            .then(value => {
                this.addRole(value.roleName)
            })
            .catch(error => message.error(error.message, 1))
    };
    // 请求添加角色
    addRole = async roleName => {
        let result = await reqAddRole(roleName);
        if(result.status === 0){
            message.success('添加成功!', 1);
            this.setState({visible: false});
        }else{
            message.error('添加失败,请刷新后重试!', 1);
        }
    }
    // 点击新增角色取消回调
    handleAddCancel = e => {
        this.formRef.resetFields();//重置表单
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    render(){
        const columns = [
            {
                title: '角色名称',
                align: 'center',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '创建时间',
                align: 'center',
                dataIndex: 'create_time',
                key: 'add_time',
            },
            {
                title: '授权时间',
                align: 'center',
                dataIndex: 'auth_time',
                key: 'auth_time',
                render: (time) => time ? time : ''
            },
            {
                title: '授权人',
                align: 'center',
                dataIndex: 'auth_name',
                key: 'auth_name',
            },
            {
                title: '操作',
                align: 'center',
                key: 'operation',
                render: () => (<Button type="link" onClick={this.showAuth}>设置权限</Button>)
            },
        ];

        const {roleList} = this.state;
        return (
            <div>
                <Modal
                    title="新增角色"
                    visible={this.state.visible}
                    onOk={this.handleAddOk}
                    onCancel={this.handleAddCancel}
                    okText="确认"
                    cancelText="取消"
                >
                    <Form 
                            name="normal_login" 
                            className="login-form" 
                            ref={(form) => {this.formRef = form}}
                        >
                        <Form.Item
                            name="roleName"
                            label="角色名称"
                            rules={[
                                {
                                    required: true,
                                    message: '分类名不能为空!'
                                }
                            ]}
                        >
                            <Input
                                placeholder="请输入角色名"
                            />
                        </Form.Item>
                    </Form>
                </Modal>
                <Card title={<Button onClick={this.showAddRole} type="primary"><PlusOutlined />新增角色</Button>}>
                    <Table dataSource={roleList} columns={columns} bordered rowKey="_id"/>
                </Card>
            </div>
        )
    }
}