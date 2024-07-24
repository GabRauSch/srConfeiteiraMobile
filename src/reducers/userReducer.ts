import Subscription from "../components/Subscription";
import { User } from "../types/User";

interface State {
    user: User
}

interface Action {
    type: string; 
    payload?: any; 
}

export const setUser = (payload: any) => ({
    type: 'SET_USER',
    payload
});

export const loggedOut: User = {id: 0, planId: 0, name: 'Convidado', email: '', phone: '', refferalCode: '', userPermission: 0, subscriptionLevel: -1, paymentDate: '', dueDate: ''} 

const initialState: State = {
    user: loggedOut
}

const reducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case 'SET_USER':
                return {
                    ...state,
                    user: action.payload
                };
        default: break;
    }
    return state;
}

export default reducer;
