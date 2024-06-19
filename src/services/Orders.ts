import { callDeleteEndpoint, callGetEndpoint, callPostEndpoint, callPutEndpoint } from "./api"
export const getAllOrdersByUserId = async (userId: number, queries?: string)=>{
    const response = await callGetEndpoint(`/orders/all`, [userId], queries);

    return response;
}

export const updateOrder = async (id: number, product: any)=>{
    const response = await callPutEndpoint(`/orders/${id}`, product);
    return response
}
export const getOrderById = async (id: number)=>{
    const response = await callGetEndpoint(`/orders/${id}`, []);
    return response.data
}

export const createOrder = async (order: any)=>{
    const response = await callPostEndpoint(`/orders`, order);
    return response
}

export const deleteOrder = async (id: number)=>{
    const response = await callDeleteEndpoint(`/orders/${id}`);
    return response
}