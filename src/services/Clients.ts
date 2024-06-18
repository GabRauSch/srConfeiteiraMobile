import { Product } from "../types/Product";
import { callDeleteEndpoint, callGetEndpoint, callPostEndpoint, callPutEndpoint } from "./api"

export const getAllClientsByUserId = async (userId: number, queries?: any)=>{
    const response = await callGetEndpoint(`/clients/all`, [userId], queries);

    return response;
}

export const updateClient = async (id: number, client: any)=>{
    const response = await callPutEndpoint(`/clients/${id}`, client);
    return response
}
export const getClientById = async (id: number)=>{
    const response = await callGetEndpoint(`/clients/${id}`, []);
    return response.data
}

export const createClient = async (client: any)=>{
    const response = await callPostEndpoint(`/clients`, client);
    return response
}
export const deleteClient = async (id: number)=>{
    const response = await callDeleteEndpoint(`/clients/${id}`);
    return response
}