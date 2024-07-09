import { callDeleteEndpoint, callGetEndpoint, callPostEndpoint, callPutEndpoint } from "./api"
export const updateComplements = async (orderId: number, ordercomplements: any[])=>{
    const response = await callPutEndpoint(`/orderItems/${orderId}`, ordercomplements);

    return response;
}