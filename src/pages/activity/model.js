import { info, } from "@/services/detail";
import { message } from "antd";
import { getCookie } from "@/utils/method";

const GlobalModel = {
    namespace: "activity",
    state: {
        data: {},
        user: {},
        action: {}
    },
    effects: {
        *fetch({ payload }, { call, put, select }) {
            const res = yield call(info);

            if (!res.data.user || !res.data.user.name) {
                yield put({
                    type: "modal/updateData",
                    payload: { nameVisible: true }
                });
                return
            }
            yield put({
                type: "updateData",
                payload: {
                    user: res.data.user || {},
                    help: res.data.help || {},
                    initiate: res.data.initiate || {},
                }
            })

        },
        *help({ payload }, { call, put, select }) {

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
