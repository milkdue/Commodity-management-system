import React, {Component} from 'react';
import {Card, Button, Table, Modal, Form, Input, message, Tree} from 'antd';
import {connect} from 'react-redux';
import {PlusSquareOutlined} from '@ant-design/icons';
import dayjs from 'dayjs';
import {reqAddRole, reqRoleList, reqAuthRole} from '../../api/index.js';
import menuList from '../../config/menu-config.js';

@connect(
    state => ({username: state.userInfo.user.username}),
    {}
)
class Role extends Component{

    state = {
        addVisible: false, // 添加用户可见
        roleVisible: false, // 权限可见
        roleList: [], // 角色列表
        authList: [], // 生成权限的数据
        checkedKeys: ['home'], // 默认选中的节点
        _id: '', // 要授权的角色的id
        menus: [], // 权限key的数组
        isLoading: true
    };

    checkedKeys = [];

    componentDidMount(){
        this.getRoleList();
        // menuList外面套一层
        let newMenuList = [{title: '平台功能', key: '0', children: menuList}]
        this.setState({authList: newMenuList})
    }
    componentDidUpdate(){
        if(this.formRef){
            this.formRef.resetFields();//重置表单
        }
    }
    // 请求角色列表
    getRoleList = async () => {
        let result = await reqRoleList();
        if(result.status === 0){
            this.setState({roleList: result.data.reverse(), isLoading: false});
        }else{
            message.error('获取角色列表失败,请刷新后重试!', 1);
        }
    }
    // 展示新增角色模态框
    showAddRole = () => {
        this.setState({addVisible: true});
    }
    // 展示设置权限模态框
    showAuth = (id) => {
        // 数据回显
        const {roleList, checkedKeys} = this.state;
        let result = roleList.find((item) => item._id === id);
        if(result){
            let newCheckedKeys = [...checkedKeys, ...result.menus];
            this.checkedKeys = newCheckedKeys
            this.setState({checkedKeys: newCheckedKeys});
        }
        this.setState({roleVisible: true, _id: id});
    }
    // 点击新增角色确定回调
    handleAddOk = () => {
        // 表单验证
        this.formRef.validateFields()
            .then(value => {
                let result = this.state.roleList.find((item) => item.name === value.roleName)
                if(result) message.warning('角色名重复!', 1);
                else this.addRole(value.roleName);
            })
            .catch(error => message.error(error.message, 1))
    };
    // 请求添加角色
    addRole = async roleName => {
        let result = await reqAddRole(roleName);
        if(result.status === 0){
            let newRoleList = [...this.state.roleList];
            newRoleList.unshift(result.data)
            message.success('添加成功!', 1);
            this.setState({addVisible: false, roleList: newRoleList});
        }else{
            message.error('添加失败,请刷新后重试!', 1);
        }
    }
    // 点击新增角色取消回调
    handleAddCancel = () => {
        this.formRef.resetFields();//重置表单
        this.setState({addVisible: false});
    };
    // 点击确认的回调
    handleRoleOk = async () => {
        const {menus, _id} = this.state;
        if(menus.length !== 0){
            const auth_name = this.props.username;
            let result = await reqAuthRole({menus, _id, auth_name})
            if(result.status === 0){
                message.success('授权成功!', 1);
                this.getRoleList();
                this.setState({roleVisible: false});
            }else{
                message.error('授权失败,请重试!', 1);
            }
        }else{
            message.warning('请至少选择一个权限!', 1);
        }
        
    }
    // 点击取消的回调
    handleRoleCancel = () => {
        this.setState({roleVisible: false, checkedKeys: ['home']});
    }
    // 选择的回调
    onCheck = (menus) => {
        // 选中的节点也要维护到状态 以便于显示
        this.setState({menus, checkedKeys: menus})
    }

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
                render: time => (dayjs(time).format('YYYY-MM-DD HH:mm:ss'))
            },
            {
                title: '授权时间',
                align: 'center',
                dataIndex: 'auth_time',
                key: 'auth_time',
                render: (time) => time ? dayjs(time).format('YYYY-MM-DD HH:mm:ss') : ''
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
                render: (item) => (<Button type="link" onClick={() => {this.showAuth(item._id)}}>设置权限</Button>)
            },
        ];

        const {roleList, addVisible, authList, isLoading, checkedKeys} = this.state;
        return (
            <div>
                <Modal
                    title="新增角色"
                    visible={addVisible}
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
                <Card title={<Button onClick={this.showAddRole} type="primary"><PlusSquareOutlined />新增角色</Button>}>
                    <Table dataSource={roleList} columns={columns} bordered rowKey="_id" loading={isLoading}/>
                </Card>
                <Modal
                    title="权限设置"
                    visible={this.state.roleVisible}
                    onOk={this.handleRoleOk}
                    onCancel={this.handleRoleCancel}
                    okText="确认"
                    cancelText="取消"
                >
                    <Tree
                        checkable // 节点前添加 Checkbox 复选框
                        onCheck={this.onCheck} // 选中的回调
                        defaultCheckedKeys={['home']} // 默认选中的节点
                        defaultExpandAll // 展开所有节点
                        treeData={authList} // 数据
                        checkedKeys={checkedKeys}
                    />
                </Modal>
            </div>
        )
    }
}

export default Role;