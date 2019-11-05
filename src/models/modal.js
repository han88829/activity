import { onhelp, addName } from "@/services/detail";
import { message } from "antd";

const GlobalModel = {
    namespace: "modal",
    state: {
        visible: false,
        data: {},
        nameVisible: false,
        name: "",

    },
    effects: {
        *onHelp({ payload }, { call, put, select }) {
            const data = payload.data;
            if (!data.grade || !data.url) {
                message.error('等级和图片不能为空！');
                return
            }

            const res = yield call(onhelp, data);

            if (res.status == 1) {
                message.success('保存成功！');
                yield put({
                    type: "updateData",
                    payload: { data: {}, visible: false }
                })
                yield put({
                    type: "detail/fetch",
                    payload: { id: data.pid }
                });
            }
        },
        *addName({ payload, }, { call, put, select }, ) {
            const res = yield call(addName, payload.name);
            yield put({
                type: "updateData",
                payload: { name: "", nameVisible: false }
            });

        },
    },
    reducers: {
        updateData(state, { payload }) {
            return {
                ...state, ...payload
            }
        }
    },
};
export default GlobalModel;
