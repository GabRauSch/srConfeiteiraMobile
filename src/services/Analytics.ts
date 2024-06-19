import { callGetEndpoint } from "./api"

export const getAnalytics = async (userId: number)=>{
    const response = await callGetEndpoint('/analytics', [userId]);;
    return response
}