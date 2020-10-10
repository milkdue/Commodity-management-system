import React, { Component } from 'react';
import {Form, Input, Button, Card, message, Select} from 'antd';
import {connect} from 'react-redux';
import {LeftSquareOutlined} from '@ant-design/icons';
import {reqCategoryList, reqAddProduct} from '../../../api/index.js';
import PicturesWall from './pictures_wall/pictures_wall.jsx';
import TextEditor from './text_editor/text_editor.jsx';
import './css/product_add.less';
const {Option} = Select;


@connect(
    state => ({}),
    {}
)
class ProductAddUpdate extends Component {

    state = {
        categoryList: [], // 获取商品列表
        type: 'add', // 判断是否修改或者添加商品
        name: '', // 回显数据的商品名称
        desc: '', //回显数据的描述
        price: '',// 回显数据的价格
        categoryId: '', // 回显商品的分类
    }

    componentDidMount(){
        // 获取id
        const {id} = this.props.match.params;
        if(id){
            this.setState({type: 'update'});
        }
        this.getCategoryList();
    }
    // 获取分类列表
    getCategoryList = async () => {
        let result = await reqCategoryList();
        if(result.status === 0){
            this.setState({categoryList:result.data});
        }else{
            message.error('获取列表失败,请刷新后重试!', 1);
        }
    }

    photoRef = React.createRef();

    onFinish = async values => {
        let imgs = this.photoRef.current.getPhotoList();
        let detail = this.textRef.getText();
        let result = await reqAddProduct({...values, imgs, detail});
        if(result.status === 0){
            message.success('添加成功!', 1);
            this.props.history.replace('/admin/production/product');
        }else{
            message.error('添加失败,请重试!', 1);
        }
    }
    render() {
        const {categoryList, type} = this.state;
        return (
            <Card title={<Button type="link" className="go-back" onClick={() => {this.props.history.goBack()}}><LeftSquareOutlined className="back-icon"/>{type === 'add' ? '商品添加' : '商品修改'}</Button>}>
                <Form 
                    labelCol={{xl: 2, md: 5, sm: 8, xs: 12}}
                    wrapperCol={{xl: 8, md: 12, sm: 16, xs: 20}}
                    name="normal_login" 
                    className="login-form" 
                    // 表单默认值，只有初始化以及重置时生效 obj
                    initialValues={{ remember: true }}
                    // 提交表单成功的回调
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        label="商品名称"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '商品名称不能为空!',
                            }
                        ]}
                    >
                        <Input 
                            // prefix={} 
                            placeholder="商品名称" 
                        />
                    </Form.Item>
                    <Form.Item
                        label="商品描述"
                        name="desc"
                        rules={[
                            {
                                required: true,
                                message: '商品描述不能为空!',
                            }
                        ]}
                    >
                        <Input
                            // prefix={}
                            placeholder="商品描述"
                        />
                    </Form.Item>
                    <Form.Item
                        label="商品价格"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: '商品价格不能为空!',
                            }
                        ]}
                    >
                        <Input
                            prefix="￥"
                            addonAfter="元"
                            type="number"
                            placeholder="商品价格"
                        />
                    </Form.Item>
                    <Form.Item
                        label="商品分类"
                        name="categoryId"
                        rules={[
                            {
                                required: true,
                                message: '请选择一个分类'
                            }
                        ]}
                    >
                        <Select placeholder="请选择一个分类">
                            {
                                categoryList.map((item) => (<Option value={item._id} key={item._id}>{item.name}</Option>))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="商品图片"
                        name="imgs"
                        wrapperCol={{xl: 16, md: 12, sm: 8, xs: 4}}
                    >
                        <PicturesWall ref={this.photoRef}/>
                    </Form.Item>
                    <Form.Item
                        label="商品详情"
                        name="detail"
                        wrapperCol={{xl: 17, md: 12, sm: 8, xs: 4}}
                    >
                        <TextEditor ref={(text) => {this.textRef = text}}/>
                    </Form.Item>

                    <Form.Item label=
                        {
                            <Button type="primary" htmlType="submit" className="login-form-button" size="large">提交</Button>
                        } 
                        className="btn-last"
                    >
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default ProductAddUpdate;