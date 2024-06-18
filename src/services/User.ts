import { callGetEndpoint } from "./api";

export const retrieveUserData =  async (id: number)=>{
    const response = await callGetEndpoint(`/users`, [id]);
    return response
}