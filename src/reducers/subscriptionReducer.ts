import { Subscription, SubscriptionLevel } from "../types/Subscription";

interface State {
    subscription: Subscription
}

interface Action {
    type: string; 
    payload?: any; 
}

export const setSubscription = (payload: any) => ({
    type: 'SET_SUBSCRIPTION',
    payload
});


const initialState: State = {
    subscription: {subscriptionLevel: 0, paymentDate: new Date()}
}

const reducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case 'SET_SUBSCRIPTION':
                return {
                    ...state,
                    subscription: action.payload
                };
            break;
        default: break;
    }
    return state;
}

export default reducer;
