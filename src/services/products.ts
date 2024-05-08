import { Product } from "../types/Product";
import { callGetEndpoint, callPostEndpoint, callPutEndpoint } from "./api"

export const getAllByUserId = async (userId: number, queries?: any)=>{
    const response = await callGetEndpoint(`/products/all`, [userId], queries);

    return response.data;
}

export const updateProduct = async (id: number, product: any)=>{
    const response = await callPutEndpoint(`/products/${id}`, product);
    return response.data
}
export const getProductById = async (id: number)=>{
    const response = await callGetEndpoint(`/products/${id}`, []);
    return response.data
}

export const createProduct = async (product: any)=>{
    const response = await callPostEndpoint(`/products`, product);
    return response
}