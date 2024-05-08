import { callGetEndpoint } from "./api"

export const findCategories = async (userId: number)=>{
    const response = await callGetEndpoint(`/categories/all`, [userId]);
    return response.data
}