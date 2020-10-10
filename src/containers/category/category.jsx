import React, {Component} from 'react';
import {Modal ,Table, Tag, Card, Button, Input, Form, message} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';
import {reqCategoryList, reqAddCategory, reqUpdateCategory} from '../../api/index.js';
import {colorType, colorCount, adjective, adjectiveCount} from '../../config/color.js';
import {PAGE_SIZE} from '../../config/index.js';


export default class Category extends Component{
    state = { 
        visible: false, // 模态框显示
        type: '', // add updata
        category: [], // 数据
        isLoading: true, // 数据还未接收 加载状态
        modalId: '', // 修改时模态框的id
        modalName: ''
    };

    myRef = React.createRef()

    componentDidMount(){
      this.getCategoryList();
    }
    // 数据回显 必须使用该钩子 当状态改变的时候自动调用该方法 myRef在showUpdate中无法取到setFieldsvalue方法
    componentDidUpdate() {
      
      if (this.formRef) {
        this.formRef.setFieldsValue({
          categoryname: this.state.modalName
        })
      }
    }

    // 获取分类列表
    getCategoryList = async () => {
      let result = await reqCategoryList();
      if(result.status !== 0){
        this.setState({isLoading: false});
        message.error(result.msg, 1);
        return;
      }
      let category = result.data.map((item) => {
        this.showTag(item);
        return item;
      })
      this.setState({category:category.reverse(),isLoading: false});
    }
    // 展示标签
    showTag = (obj) => {
      if(Math.floor(Math.random() * 2) % 2 === 1){
        obj.tags = [adjective[Math.floor(Math.random() * adjectiveCount)]]
      }else{
        let adjective1 = 1, adjective2 = 1;
        while(adjective1 === adjective2){
          adjective1 = Math.floor(Math.random() * adjectiveCount);
          adjective2 = Math.floor(Math.random() * adjectiveCount);
        }
        obj.tags = [adjective[adjective1], adjective[adjective2]]
      }
    }
    // 添加分类
    showAdd = () => {
      this.setState({
        visible: true,
        type: 'add'
      });
    };
    // 修改分类 修改状态以便update钩子调用数据回显
    showUpdate = (item) => {
      this.setState({
        visible: true,
        type: 'update',
        modalName: item.name,
        modalId: item._id
      });
    };
    // 添加分类 ajax
    addCategory = async (value) => {
      let result = await reqAddCategory(value);
      if(result.status !== 0){
        message.error('添加失败，请重试!', 1);
        return;
      }
      let {data} = result;
      this.showTag(data);
      let newcategory = [...this.state.category];
      newcategory.unshift(data);
      this.setState({
        visible: false,
        category: newcategory
      });
      this.myRef.current.resetFields();//重置表单
    }
    // 修改分类
    updataCategory = async (value) => {
      let resultIsExist = this.state.category.find((item) => {
        return item.name === value.categoryname;
      })

      if(resultIsExist){
        message.warning('此分类以存在')
      }else{
        let result = await reqUpdateCategory(this.state.modalId, value.categoryname);
        if(result.status === 0){
          this.setState({
            visible: false
          });
          this.myRef.current.resetFields();//重置表单
          this.getCategoryList();// 重新获取列表
        }else{
          message.error('修改失败，请重试!', 1);
        }
      }
    }
    // 点击确定
    handleOk = () => {
        // 表单验证
      this.myRef.current.validateFields()
        .then(value => {
          // 判断类型
          if(this.state.type === 'add') this.addCategory(value.categoryname);
          if(this.state.type === 'update') this.updataCategory(value);
        })
        .catch(error => message.error(error.message, 1))
    };
    // 点击取消
    handleCancel = () => {
      this.formRef.resetFields();//重置表单
        this.setState({
          visible: false,
          modalName: ''
        });
    };

   
    render(){
        // 列
        const columns = [
            {
              title: '分类名称',
              align: 'center',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '标签',
              align: 'center',
              key: 'tags',
              width: '25%',
              dataIndex: 'tags',
              render: tags => (
                <>
                  {tags.map(tag => {
                    let color = colorType[Math.floor(Math.random() * colorCount)];
                    return (
                      <Tag color={color} key={tag}>
                        {tag.toUpperCase()}
                      </Tag>
                    );
                  })}
                </>
              )

            },
            {
              title: '操作',
              align: 'center',
              width: '25%',
              key: 'action',
              // 默认将该行所有数据作为参数注入
              render: (item) => (<Button onClick={() => {this.showUpdate(item)}} ghost type="dashed" style={{color: '#4077B0'}}>修改分类</Button>)
            },
        ];
        return (
            <div>
                <Modal
                    title={this.state.type === 'update' ? '修改分类' : '添加分类'}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                >
                    <Form 
                            name="normal_login" 
                            className="login-form" 
                            ref={(form) => {this.formRef = form}}
                        >
                        <Form.Item
                            name="categoryname"
                            rules={[
                                {
                                    required: true,
                                    message: '分类名不能为空!'
                                }
                            ]}
                            initialValue={this.state.modalName}
                        >
                            <Input
                                placeholder="请输入分类名"
                            />
                        </Form.Item>
                    </Form>
                </Modal>
                <Card  extra={<Button onClick={this.showAdd} type="primary"><PlusCircleOutlined />添加分类</Button>}>
                    <Table 
                    columns={columns} 
                    dataSource={this.state.category} 
                    bordered={true}
                    loading={this.state.isLoading}
                    rowKey="_id"
                    pagination={{pageSize: PAGE_SIZE, showQuickJumper: true}}
                />
                </Card>
            </div> 
        )
    }
}