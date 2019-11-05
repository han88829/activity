import React, { Component } from 'react';
import { Modal, } from 'antd';
import { connect } from "dva";
import "./index.less";

@connect(({ modal, loading }) => ({
    modal,
    loading: loading.effects["detail/fetch"]
}))
class App extends Component {
    render() {
        const { modal: { loading, data, visible }, dispatch } = this.props;
        return (
            <Modal
                title="互助"
                visible={visible}
                onOk={() => { }}
                onCancel={() => {
                    dispatch({
                        type: "modal/updateData",
                        payload: { visible: false, data: {} }
                    })
                }}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        );
    }
}

export default App;