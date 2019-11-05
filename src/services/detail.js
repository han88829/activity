import request from "@/utils/request";
export async function query(id) {
    return request(`/api/activity/lst?id=${id}`);
} 