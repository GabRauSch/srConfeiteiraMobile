import { Complement } from "../types/OrderComplements";
import { callDeleteEndpoint, callGetEndpoint, callPostEndpoint, callPutEndpoint } from "./api"

export const getComplementsByOrderId = async (orderId: number)=>{
    const response = await callGetEndpoint(`/orderComplements`, [orderId]);
    return response
}

export const updateComplements = async (orderId: number, complements: Complement[])=>{
    const response = await callPutEndpoint(`/orderComplements/${orderId}`, complements)
}