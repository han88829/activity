import { query } from "@/services/detail";
import { message } from "antd";
const GlobalModel = {
    namespace: "detail",
    state: {
        data: {},
        list: []
    },
    effects: {
        *fetch({ payload }, { call, put, select }) {
            const res = yield call(query, payload.id);

            if (res.status == 1) {
                yield put({
                    type: "updateData",
                    payload: { data: res.data.data || {}, list: res.data.list || [] }
                })
            }
        },
        *help({ payload }, { call, put, select }) {

            

        }
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
