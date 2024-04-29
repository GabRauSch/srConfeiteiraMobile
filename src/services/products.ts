import { Product } from "../types/Product";
import { callGetEndpoint, callPutEndpoint } from "./api"

export const getAllByUserId = async (userId: number, queries?: any)=>{
    const response = await callGetEndpoint(`/products/all`, [userId], queries);

    return response.data;
}

export const updateProduct = async (userId: number, product: any)=>{
    const response = await callPutEndpoint(`/products/${userId}`, product);
    return response.data
}