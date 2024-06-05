import { callDeleteEndpoint, callGetEndpoint, callPostEndpoint, callPutEndpoint } from "./api"
export const getByOrderId = async (orderId: number, queries?: string)=>{
    const response = await callGetEndpoint(`/orderItems`, [orderId], queries);

    return response.data;
}
export const finishOrder = async (id: number)=>{
    const response = await callPutEndpoint(`/orderItems/${id}`, []);
    return response.data
}

export const addProductToOrder = async (id: number, product: any)=>{
    const response = await callPutEndpoint(`/orderItems/add/${id}`, product)
    return response.data
}

export const updateOrCreateOrderItems = async (id: number, data: any)=>{
    const response = await callPutEndpoint(`/orderItems/${id}`, data);
    return response.data
}