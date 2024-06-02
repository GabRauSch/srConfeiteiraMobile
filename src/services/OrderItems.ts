import { callDeleteEndpoint, callGetEndpoint, callPostEndpoint, callPutEndpoint } from "./api"
export const getByOrderId = async (orderId: number, queries?: string)=>{
    const response = await callGetEndpoint(`/orderItems`, [orderId], queries);

    return response.data;
}
export const finishOrder = async (id: number)=>{
    const response = await callPutEndpoint(`/orderItems/${id}`, []);
    return response.data
}
export const updateOrder = async (id: number)=>{
    const response = await callPutEndpoint(`/orderItems/${id}`, []);
    return response.data
}