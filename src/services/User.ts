import { User } from "../types/User";
import { callGetEndpoint, callPutEndpoint } from "./api";

export const retrieveUserData =  async (id: number)=>{
    const response = await callGetEndpoint(`/users`, [id]);
    return response
}

export const updateUser = async (id: number, data: any)=>{
    const response = await callPutEndpoint(`/users/${id}`, data)
    return response
}