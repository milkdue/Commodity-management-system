import React, {Component} from 'react';
import {Card, Button, Table} from 'antd';
import {UserAddOutlined} from '@ant-design/icons';
import dayjs from 'dayjs';
import {reqUserList} from '../../api/index.js';


export default class User extends Component{
    state = {
        isLoading: false,
    }

    componentDidMount(){
        this.getUserList()
    }

    getUserList = async () => {
        let result = await reqUserList();
        console.log(result);
    }
    render(){
        const dataSource = [
            {
              _id: '1',
              name: '胡彦斌',
              age: 32,
              address: '西湖区湖底公园1号',
            },
            {
              _id: '2',
              name: '胡彦祖',
              age: 42,
              address: '西湖区湖底公园1号',
            },
          ];
          
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
                render: (time) => dayjs(time).format('YYYY-MM-DD HH:mm:ss')
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                align: 'center',
                key: 'role_id',
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
        const {isLoading} = this.state;
        return (
            <div>
                <Card title={<Button type="primary"><UserAddOutlined />创建用户</Button>}>
                    <Table dataSource={dataSource} columns={columns} bordered rowKey="_id" loading={isLoading}/>
                </Card>
            </div>
        )
    }
}