import React, { Component } from 'react';
import { Modal, Input } from 'antd';
import { connect } from "dva";
import "./index.less";

@connect(({ modal, loading }) => ({
    modal,
    loading: loading.effects["detail/fetch"]
}))
class App extends Component {
    render() {
        const { modal: { name, nameVisible }, dispatch } = this.props;
        return (
            <Modal
                title="互助"
                visible={nameVisible}
                onOk={() => {
                    dispatch({
                        type: "modal/addName",
                        payload: { name }
                    })
                }}
                onCancel={() => {
                    dispatch({
                        type: "modal/updateData",
                        payload: { nameVisible: false, name: "" }
                    })
                }}
            >
                <Input
                    placeholder="请输入名称！"
                    value={name}
                    onChange={e => {
                        dispatch({
                            type: "modal/updateData",
                            payload: { name: e.target.value }
                        })
                    }}
                />
            </Modal>
        );
    }
}

export default App;