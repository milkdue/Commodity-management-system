import React, {Component} from 'react';
import {Card, Button, Table, Select, Input, message} from 'antd';
import {PlusOutlined, SearchOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';
import {reqProductList, reqUpdateProductState, reqSearchProductList} from '../../api/index.js';
import {PRODUCT_SIZE} from '../../config/index.js';
import {createSaveProductListAction} from '../../redux/actions/create_save_product_list_action'

const {Option} = Select;

@connect(
    state => ({}),
    {
        saveProductList: createSaveProductListAction
    }
)
class Product extends Component{
    
    state = {
        productList: [], // 商品列表
        total: 0, // 商品总数
        current: 1, // 当前页数
        isLoading: true, // 是否正在加载
        searchType: 'productName',// 搜索方式
        keyWord: '', // 关键字
    }

    componentDidMount(){
        this.getProductList();
    }

    // 商品状态管理
    updateProductState = async (item) => {
        const {_id, status} = item;
        let state = (status === 1 ? 2 : 1);
        let result = await reqUpdateProductState(_id, state);
        if(result.status === 0){
            let productList = [...this.state.productList];
            productList.map((item) => {
                if(item._id === _id){
                    item.status = state;
                }
                return item
            });
            this.setState({
                productList
            })
            if(state === 2){
                message.success('下架成功!', 1);
            }else{
                message.success('上架成功!', 1);
            }
        }else{
            if(state === 2){
                message.success('下架失败,请刷新后重试!', 1);
            }else{
                message.success('上架失败,请刷新后重试!', 1);
            }
        }
    }

    // 获取商品列表 并保存到redux
    getProductList = async (page=1) => {
        let result;
        if(this.isSearch){
            const {searchType, keyWord} = this.state;
            result = await reqSearchProductList(page, PRODUCT_SIZE, searchType, keyWord)
        }else{
            result = await reqProductList(page, PRODUCT_SIZE);
        }
        if(result.status === 0){
            let {list, total} = result.data;
            this.setState({
                productList: list,
                total,
                isLoading: false,
                current: page
            });
            // 存入store
            this.props.saveProductList(list)
        }else{
            this.setState({isLoading: false})
            message.error('获取商品列表失败!', 1);
        }
    }
    // 获取到选择框的值 维护到状态
    handleChange = (value) => {
        this.setState({
            searchType: value
        })
    }
    // 获取关键字 并维护到状态
    getKeyWord = (event) => {
        this.setState({
            keyWord: event.target.value
        })
    }
    // 搜索关键字发送请求
    searchKeyWord = () => {
        this.state.keyWord === '' ? this.isSearch = false : this.isSearch = true;
        this.getProductList();
    }

    render(){
        const columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
                align: 'center',
                width: '20%',
                key: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
                align: 'center',
                key: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                align: 'center',
                width: '10%',
                key: 'price',
                render: (price) => {
                    return <span>{'￥' + price}</span>
                }
            },
            {
                title: '状态',
                align: 'center',
                width: '10%',
                key: 'status',
                render: (item) => {
                    if(item.status === 1){
                        return (
                            <div>
                                <Button danger type="primary" onClick={() => {this.updateProductState(item)}}>下架</Button><br />
                                <span>在售</span>
                            </div>
                        )
                    }else{
                        return (
                            <div>
                                <Button type="primary" onClick={() => {this.updateProductState(item)}}>上架</Button><br />
                                <span>已停售</span>
                            </div>
                        )
                    }
                }
            },
            {
                title: '操作',
                align: 'center',
                width: '10%',
                key: 'operation',
                render: (item) => {
                    return (
                        <div>
                            <Button type="link" onClick={() => {this.props.history.push(`/admin/production/product/detail/${item._id}`)}}>详细</Button><br />
                            <Button type="link" onClick={() => {this.props.history.push(`/admin/production/product/add_update/${item._id}`)}}>修改</Button>
                        </div>
                    )
                }
            },
        ];
        return (
            <Card 
                title={
                    <div>
                        <Select defaultValue="productName" style={{width: '8%'}} onChange={this.handleChange}>
                            <Option value="productName">按名称搜索</Option>
                            <Option value="productDesc">按描述搜索</Option>
                        </Select>
                        <Input placeholder="关键字" style={{width: '15%', marginLeft: '1%'}} allowClear onChange={this.getKeyWord}/>
                        <Button type="primary" style={{marginLeft: '1%'}} onClick={this.searchKeyWord}><SearchOutlined />搜索</Button>
                    </div>
              } 
                extra={<Button type="primary" onClick={() => {this.props.history.push('/admin/production/product/add_update')}}><PlusOutlined />添加商品</Button>}
            >
                <Table 
                    dataSource={this.state.productList} 
                    columns={columns}
                    bordered
                    pagination={{pageSize: 5, showQuickJumper: true, total: this.state.total, current: this.state.current, onChange:this.getProductList}}
                    rowKey="_id"
                    loading={this.state.isLoading}
                />
            </Card>
        )
    }
}

export default Product;