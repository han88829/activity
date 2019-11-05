import React, { Component } from 'react';
import { connect } from "dva";
import { Row, Col, Icon, Timeline, Spin, message, Modal } from "antd";
import ModalDetail from "./Modal";
import { getCookie } from "@/utils/method";
import AddNameModal from "./AddNameModal";
import moment from "moment";
import copy from "copy-to-clipboard";
import "./index.less";

@connect(({ detail, loading }) => ({
    detail,
    loading: loading.effects["detail/fetch"]
}))
class index extends Component {

    state = {
        img: "",
        visible: false
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.dispatch({
            type: "detail/fetch", payload: { id }
        })
    }


    render() {
        const { detail: { data = {}, list = [] }, loading } = this.props;
        const id = this.props.match.params.id;
        return (
            <Spin spinning={loading}>
                <div className="activity-detail" >
                    <div className="title">
                        <Row  >
                            <Col span={12}>
                                <div className="name">名称</div>
                                <div className="content">{data.group || ""}</div>
                            </Col>
                            <Col span={12}>
                                <div className="name">发起人</div>
                                <div className="content">{data.name || ""}</div>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 20 }}>
                            <Col span={12}>
                                <div className="name">已互等级</div>
                                <div className="content">
                                    {list.reduce((a, b) => a += Number(b.grade), 0) || "0"}
                                </div>
                            </Col>
                            <Col span={12}>
                                <span
                                    className="copy"
                                    onClick={() => {
                                        if (!data.url) return message.error('链接错误！');
                                        if (copy(data.url)) {
                                            message.success('复制成功！')
                                        }
                                    }}
                                >复制链接</span>
                                <span
                                    className="MutualAid"
                                    onClick={() => {
                                        const user = JSON.parse(getCookie('user') || "{}");

                                        if (!user || !user.name) {
                                            message.error('未登录，请输入名称！');
                                            this.props.dispatch({
                                                type: "modal/updateData",
                                                payload: { nameVisible: true }
                                            });
                                            return
                                        }
                                        this.props.dispatch({
                                            type: "modal/updateData", payload: { visible: true, data: { pid: id } }
                                        });
                                    }}
                                >互助</span>
                            </Col>
                        </Row>
                    </div>

                    <div className="list">
                        <Timeline>
                            {list.map((item, index) => {
                                return <Timeline.Item
                                    key={item._id}
                                    color={index == 0 ? 'red' : '#1890ff'}>
                                    <span>{item.grade || "0"}级</span>
                                    <span>{item.name || ""}</span>
                                    <span>{moment(item.add_time).format('HH:mm:ss')}</span>
                                    <span>
                                        <img
                                            onClick={() => {
                                                this.setState({ visible: true, img: item.url });
                                            }}
                                            src={item.url} alt="" />
                                    </span>
                                </Timeline.Item>
                            })}
                        </Timeline>
                    </div>

                    <Icon
                        type={loading ? 'loading' : 'redo'}
                        className="refresh"
                        onClick={() => {
                            this.props.dispatch({
                                type: "detail/fetch", payload: { id }
                            })
                        }}
                    />
                </div >
                <ModalDetail />
                <AddNameModal />
                <Modal
                    visible={this.state.visible}
                    onCancel={() => this.setState({ visible: false, img: "" })}
                    footer={null}
                >
                    <img src={this.state.img} alt="" className="detail-modal-img" />
                </Modal>
            </Spin >
        );
    }
}

export default index;