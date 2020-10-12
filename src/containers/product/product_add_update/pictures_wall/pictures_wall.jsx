import React from 'react';
import {Upload, Modal, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {BASE_URL} from '../../../../config/index.js';
import {reqRemovePhoto} from '../../../../api/index.js';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {
  state = {
    previewVisible: false,// 预览
    previewImage: '',//预览图片的url
    previewTitle: '',// 图片的name
    fileList: []// 图片列表
  };

  setFileList = (imgs) => {
    let fileList = [];
    imgs.forEach((item, index) => {fileList.push({uid: -index, name: '商品图片', url: BASE_URL + '/upload/' + item})});
    this.setState({fileList});
  }
  // 取消回调
  handleCancel = () => {this.setState({ previewVisible: false })};
  // 预览回调
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      // console.log(file.originFileObj); //转为base64编码
      file.preview = await getBase64(file.originFileObj);
    }
    console.log(file.url)

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
  // 上传回调
  handleChange = async ({fileList, file}) => { // 4个状态 uploading / done / error / removed
    if(file.status === 'done'){
      // console.log(file)
      message.success('上传成功!', 1);
      fileList[fileList.length - 1].name = '商品图片';
      fileList[fileList.length - 1].url = BASE_URL + '/upload/' + file.response.data.name;
      fileList[fileList.length - 1].uid = file.response.data.name;
      this.setState({fileList});
    }else if(file.status === 'error'){
      message.error('上传失败,请刷新后重试!', 1);
      this.setState({fileList});
    }
    if(file.status === 'removed'){
      console.log(file.uid)
      let result = await reqRemovePhoto(file.uid);
      if(result.status === 0){
        message.success('删除成功!', 1);
        this.setState({fileList});
      }else{
        message.error('删除失败,请重试!', 1);
      }
    }
    
  };
  // 得到图片列表
  getPhotoList = () => {
    let photoArr = [];
    let fileList = [...this.state.fileList];
    fileList.forEach((item) => {
      photoArr.push(item.uid);
    })

    return photoArr;
  }

  render() {
    const {previewVisible, previewImage, fileList, previewTitle} = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{marginTop: 8}}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action={`${BASE_URL}/manage/img/upload`} // 发送请求的url
          method="POST" // 请求方式
          name="image" // 发到后台的文件参数名
          listType="picture-card" // 图片模式
          fileList={fileList} // 从状态中读取列表
          onPreview={this.handlePreview} // 预览的回调
          onChange={this.handleChange} // 上传文件的回调
          // 当长度大于5时，不能再上传
        >
          {fileList.length >= 5 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{width: '100%'}} src={previewImage} />
        </Modal>
      </>
    );
  }
}

