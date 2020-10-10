import React, {Component} from 'react';
import {Card, Button, Table} from 'antd';
import {UserAddOutlined} from '@ant-design/icons';
import {reqUserList} from '../../api/index.js';


export default class User extends Component{
    state = {
        isLoading: false,
    }

    componentDidMount(){

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
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '邮箱',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: '电话',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '注册时间',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '所属角色',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '操作',
                dataIndex: 'address',
                key: 'address',
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