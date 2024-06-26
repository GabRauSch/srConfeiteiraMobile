import { Product } from "../types/Product";
import { callDeleteEndpoint, callGetEndpoint, callPostEndpoint, callPutEndpoint } from "./api"

export const getAllProductsByUserId = async (userId: number, queries?: any)=>{
    const response = await callGetEndpoint(`/products/all`, [userId], queries);

    return response.data;
}

export const updateProduct = async (id: number, product: any)=>{
    const response = await callPutEndpoint(`/products/${id}`, product);
    return response
}
export const getProductById = async (id: number)=>{
    const response = await callGetEndpoint(`/products/${id}`, []);
    return response.data
}

export const createProduct = async (product: any)=>{
    const response = await callPostEndpoint(`/products`, product);
    return response
}

export const deleteProduct = async (id: number)=>{
    const response = await callDeleteEndpoint(`/products/${id}`);
    return response
}