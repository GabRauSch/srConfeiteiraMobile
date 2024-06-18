import { decode as base64Decode } from 'base-64';

export const decodeToken = (token: string) => {
    console.log(token)
    return JSON.parse(base64Decode(token.split('.')[1]));
}
 