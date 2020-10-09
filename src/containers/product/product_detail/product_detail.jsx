import React, { Component } from 'react';
import {Card, Button, List, message} from 'antd';
import {LeftSquareOutlined, LoadingOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';
import {reqProductDetail, reqProductCategory} from '../../../api/index.js';
import {BASE_URL} from '../../../config/index.js';
import './css/product_detail.less';

@connect(
    state => ({productList: state.productList}),
    {}
)
class ProductDetail extends Component {

    state = {
        productDetail: {}
    }

    componentDidMount(){
        // 参数路由
        const {id} = this.props.match.params;
        const {productList} = this.props;
        // 尝试从redux中读
        if(productList){
            let result = productList.find((item) => {
                return item._id === id;
            });
            if(result){
                this.getProductCategory(result)
            }
        }else{
            this.getProductDetail(id)
        }
    }
    // 获取详情
    getProductDetail = async (id) => {
        let result = await reqProductDetail(id);
        if(result.status === 0){
            this.getProductCategory(result.data)
        }else{
            message.error('数据异常,请刷新后重试!', 1);
        }
    }
    // 获取分类名
    getProductCategory = async (data) => {
        let result = await reqProductCategory(data.categoryId);
        if(result.status === 0){
            data.categoryId = result.data.name;
            this.setState({productDetail: data});
        }else{
            message.error('数据异常,请刷新后重试!', 1);
        }
    }

    render() {
        const {categoryId, desc, detail, imgs, name, price} = this.state.productDetail;
        return (
            <Card title={<Button type="link" className="go-back" onClick={() => {this.props.history.goBack()}}><LeftSquareOutlined className="back-icon"/>商品详情</Button>}>
                <List
                    size="large"
                    bordered
                >
                    <List.Item style={{justifyContent: 'flex-start'}}>
                        <span className="title">商品名称:</span>{name ? name : <LoadingOutlined/>}
                    </List.Item>
                    <List.Item style={{justifyContent: 'flex-start'}}>
                        <span className="title">商品描述:</span>{desc ? desc : <LoadingOutlined/>}
                    </List.Item>
                    <List.Item style={{justifyContent: 'flex-start'}}>
                        <span className="title">商品价格:</span>{price ? '￥' + price : <LoadingOutlined/>}
                    </List.Item>
                    <List.Item style={{justifyContent: 'flex-start'}}>
                        <span className="title">商品分类:</span>{categoryId ? categoryId : <LoadingOutlined/>}
                    </List.Item>
                    <List.Item style={{justifyContent: 'flex-start'}}>
                        <span className="title">商品图片:{
                            imgs ? imgs.map((item, index) => (<img src={BASE_URL + '/upload/' + item} alt="商品图片" key={index}></img>)) : <LoadingOutlined/>
                        }</span>
                    </List.Item>
                    <List.Item style={{justifyContent: 'flex-start'}}>
                        <span className="title">商品详细:</span>
                        <span>{detail ? <span dangerouslySetInnerHTML={{__html: detail}}></span> : <LoadingOutlined/>}</span>
                    </List.Item>
                </List>
            </Card>
        )
    }
}

export default ProductDetail;
