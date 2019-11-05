import React, { Component } from 'react';
import { connect } from "dva";
import { Row, Col, Icon, Timeline, Spin, message, Button } from "antd";
import ModalDetail from "./detail/Modal";
import AddNameModal from "./detail/AddNameModal";
import "./index.less";

@connect(({ activity, loading }) => ({
    activity,
    loading: loading.effects["activity/fetch"]
}))
class index extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: "activity/fetch"
        });
    }

    render() {
        const { activity: { data = {}, user = {} }, loading } = this.props;
        return (
            <Spin spinning={loading}>
                <div className="activity" >
                    <Button type="primary" block>
                        新增互助
                    </Button>
                </div >
                <ModalDetail />
                <AddNameModal />
            </Spin >
        );
    }
}

export default index;