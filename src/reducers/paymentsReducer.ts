import {OrderPayments} from "../types/OrderPayments";

interface State {
    payments: OrderPayments[]
}

interface Action {
    type: string; 
    payload?: any; 
}

export const setPayment = (payload: any) => ({
    type: 'SET_PAYMENTS',
    payload
});

const initialState: State = {
    payments: []
}

const reducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case 'SET_PAYMENTS':
                return {
                    ...state,
                    payments: action.payload
                };
            break;
        default: break;
    }
    return state;
}

export default reducer;
