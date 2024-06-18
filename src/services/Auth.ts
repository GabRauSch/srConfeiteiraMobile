import { callPostEndpoint } from "./api";

type Login = {
    email: string,
    password: string
}
type Register = {
    name: string
    email: string,
    password: string,
    planId: number
}
type ConfirmationCode = {
    email: string,
    confirmationCode: string
}
export const login = async (data: Login)=>{
    const response = await callPostEndpoint(`/auth/login`, data);
    return response
}
export const register = async (data: Register)=>{
    const response = await callPostEndpoint(`/auth/register`, data);
    return response
}
export const confirmRegister = async (data: ConfirmationCode)=>{
    const response = await callPostEndpoint(`/auth/confirmRegister`, data);
    return response
}
