import { decode as base64Decode } from 'base-64';

export const decodeToken = (token: string) => {
    return JSON.parse(base64Decode(token.split('.')[1]));
}
 