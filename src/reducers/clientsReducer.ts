import { Client } from "../types/Client";
import { User } from "../types/User";

interface State {
    clients: Client[]
}

interface Action {
    type: string; 
    payload?: any; 
}

export const setClientInfo = (payload: any) => ({
    type: 'SET_CLIENT_INFO',
    payload
});

export const setClients = (payload: any) =>({
    type: 'SET_CLIENTS',
    payload
})

export const newClient = (payload: any)=>({
    type: 'NEW_CLIENT',
    payload
})

export const removeClient = (payload: any)=>({
    type: 'DELETE_CLIENT',
    payload
})

export const initialState: State = {
    clients: []
}

const reducer = (state: State = initialState, action: Action): State => {
    
    switch (action.type) {
        case 'SET_CLIENT_INFO':
            console.log('--- set client info action dispatch---');

            const {id, ...rest} = action.payload;
            const updatedClients = state.clients.map(client=>{
                if(client.id === id){
                    return {
                        ...client,
                        ...rest
                    }
                } else{
                    return client
                }
            });

            const returner =  {
                ...state,
                clients: updatedClients
            };

            return returner
        case 'SET_CLIENTS': 
            console.log('--- set clients action dispatch---');
            console.log(state.clients, action.payload)

            return {
                ...state,
                clients: action.payload
            }

        case 'NEW_CLIENT': 
        console.log('--- new client action dispatch---');

            const newClients = [...state.clients, action.payload]
            const newState = {
                ...state,
                clients: newClients
            }
            return newState
        case 'DELETE_CLIENT': 
        console.log('--- delete client action dispatch---');

            return {
                ...state,
                clients: state.clients.filter(client => client.id !== action.payload)
            };
        default: break
    }
    return state
}

export default reducer;
