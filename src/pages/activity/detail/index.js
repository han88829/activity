import React, { Component } from 'react';
import { connect } from "dva";
import { Row, Col, Icon, Timeline, Spin } from "antd";
import Modal from "./Modal";
import "./index.less";

@connect(({ detail, loading }) => ({
    detail,
    loading: loading.effects["detail/fetch"]
}))
class index extends Component {

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
                                    className="MutualAid"
                                    onClick={() => {
                                        this.props.dispatch({
                                            type: "detail/help", payload: { id }
                                        });
                                    }}
                                >互助</span>
                            </Col>
                        </Row>
                    </div>

                    <div className="list">
                        <Timeline>
                            {list.map((item, index) => {
                                return <Timeline.Item color="red">
                                    <span>{item.grade || "0"}级</span>
                                    <span>{item.name || ""}</span>
                                    <span>{item.add_time}</span>
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
                <Modal />
            </Spin >
        );
    }
}

export default index;