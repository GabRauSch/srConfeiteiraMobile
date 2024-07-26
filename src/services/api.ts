import axios, { AxiosError } from 'axios';
import * as FileSystem from 'expo-file-system'
import { RefreshControlComponent } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const backendAdress = 'https://app.srconfeiteira.com.br'

const isFileUriValid = async (uri: string) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      return fileInfo.exists && !fileInfo.isDirectory;
    } catch (error) {
      console.error('Error checking file URI:', error);
      return false;
    }
};

const getTokenFromState = async () => {
    try {
        const token = await SecureStore.getItem('authToken')

        if(token){
            return token
        }
        return ''
    } catch (error) {
        console.error(error)
        return ''
    }
}


export const callPostFormData = async (url: string, body: { image: string; userId: string }) => {
    try {
        const finalUrl = `${backendAdress}${url}`;
        const token = await SecureStore.getItem('authToken')
        
        const imageUri = body.image;
        const fileName = body.image.split('/').pop()!;
        const extension = fileName.split('.')[1];

        console.log(extension)
        console.log(imageUri)
        
        const formData = new FormData();
        formData.append('file', JSON.parse(JSON.stringify({
            name: fileName,
            uri: imageUri,
            type: `image/${extension}`
        }))); 
        formData.append('userId', body.userId);

        const response = await axios.post(finalUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const callPostEndpoint = async (url: string, body: any, queries?: string) => {
    const finalUrl = `${backendAdress}${url}`;
    try {
        const token = await SecureStore.getItem('authToken')

        const response = await axios.post(finalUrl, body, {
            validateStatus: (status) => status >= 200 && status < 500,
            headers: {
                Authorization: `Bearer ${token}`
            } 
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
        throw error;
    }
};

export const callGetEndpoint = async (url: string, params: string[] | number[], queries?: string)=>{
    try {
        const paramsString = params.join('/');
        const finalUrl = `${backendAdress}${url}/${paramsString}`;

        const token = await SecureStore.getItem('authToken')
        const response = await axios.get(finalUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.data) {
                return error.response;
            }
        }
        throw error;
    }
}

export const callPutEndpoint = async (url: string, body: object, queries?: string)=>{
    try {
        const finalUrl = `${backendAdress}${url}`
        const token = await SecureStore.getItem('authToken')
        const response = await axios.put(finalUrl, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.data) {
                return error.response;
            }
        }
        throw error;
    }
}

export const callDeleteEndpoint = async (url: string)=>{
    try {
        const finalUrl = `${backendAdress}${url}`
        const token = await SecureStore.getItem('authToken') 
        const response = await axios.delete(finalUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.data) {
                return error.response;
            }
        }
        throw error;
    }
}