import request from "@/utils/request";
export async function query(id) {
    return request(`/api/activity/lst?id=${id}`);
}

export async function info() {
    return request(`/api/activity/info`);
}

export async function addName(name) {
    return request(`/api/activity/addName?name=${name}`);
}

export async function onhelp(params) {
    return request('/api/activity/help', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(params),
    });
}