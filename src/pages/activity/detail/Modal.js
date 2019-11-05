import React, { Component } from 'react';
import { Modal, InputNumber, Upload, Icon, message } from 'antd';
import { connect } from "dva";
import "./index.less";

@connect(({ modal, loading }) => ({
    modal,
    loading: loading.effects["detail/fetch"]
}))
class App extends Component {
    state = {
        loading: false
    }
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.props.dispatch({
                    type: "modal/updateData",
                    payload: { data: { ...this.props.modal.data, url: imageUrl } }
                })
            );
        }
    };
    render() {
        const { modal: { loading, data, visible }, dispatch } = this.props;
        const uploadButton = (
            <div>
                <Icon type={loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <Modal
                title="互助"
                visible={visible}
                onOk={() => {
                    this.props.dispatch({
                        type: "modal/onHelp",
                        payload: { data }
                    });
                }}
                onCancel={() => {
                    dispatch({
                        type: "modal/updateData",
                        payload: { visible: false, data: {} }
                    })
                }}
            >
                <div className="help-list">
                    <span className="help-list-name">等级</span>
                    <span className="help-list-content">
                        <InputNumber
                            placeholder="请输入您的等级！"
                            max={55}
                            value={data.grade || 1}
                            onChange={v => {
                                dispatch({
                                    type: "modal/updateData",
                                    payload: { data: { ...data, grade: v } }
                                })
                            }}
                        />
                    </span>
                </div>
                <div className="help-list">
                    <span className="help-list-name">上传图片</span>
                    <span className="help-list-content">
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            beforeUpload={beforeUpload}
                            onChange={this.handleChange}
                        >
                            {data.url ? <img src={data.url} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    </span>
                </div>
            </Modal>
        );
    }
}

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    if (!isJpgOrPng) {
        message.error('请上传jpeg、png、jpg格式的图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片大小不能超过 2MB!');
    }
    return isJpgOrPng && isLt2M;
}


export default App;