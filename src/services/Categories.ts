import { callGetEndpoint, callPostEndpoint, callPutEndpoint } from "./api"

type CreateCategory = {
    userId: number,
    description: string
}

export const findCategories = async (userId: number)=>{
    const response = await callGetEndpoint(`/categories/all`, [userId]);
    return response
}
export const createCategory = async (data: CreateCategory)=>{
    const response = await callPostEndpoint(`/categories`, data)
    return response
}
export const updateCateogoryById = async (categoryId: number, description: string)=>{
    const response = await callPutEndpoint(`/categories/${categoryId}`, {description});
    return response
}