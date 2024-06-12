import { callDeleteEndpoint, callGetEndpoint, callPostEndpoint, callPutEndpoint } from "./api"
export const getByOrderId = async (orderId: number, queries?: string)=>{
    const response = await callGetEndpoint(`/orderPayments`, [orderId], queries);

    return response;
}
export const finishOrder = async (id: number)=>{
    const response = await callPutEndpoint(`/orderPayments/${id}`, []);
    return response.data
}
export const createPayments = async (data: any)=>{
    const response = await callPostEndpoint(`/orderPayments`, data);
    return response
}
export const updatePayments = async (id: number, data: any)=>{
    return null
}
export const deletePayments = async (id: number)=>{
    const response = await callDeleteEndpoint(`/orderPayments/${id}`)
    return response
}
