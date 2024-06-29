import { Order } from "../types/Order";
import { User } from "../types/User";

interface State {
    orders: Order[]
}

interface Action {
    type: string; 
    payload?: any; 
}

export const setOrderInfo = (payload: any) => ({
    type: 'SET_ORDER_INFO',
    payload
});

export const setOrders = (payload: any) =>({
    type: 'SET_ORDERS',
    payload
})

export const newOrder = (payload: any)=>({
    type: 'NEW_ORDER',
    payload
})

export const removeOrder = (payload: any)=>({
    type: 'DELETE_ORDER',
    payload
})

const initialState: State = {
    orders: []
}

const reducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case 'SET_ORDER_INFO':
            const {orderId, ...rest} = action.payload;
            const updatedOrders = state.orders.map(order=>{
                if(order.orderId === orderId){
                    return {
                        ...order,
                        ...rest
                    }
                } else{
                    return order
                }
            });
            const returner =  {
                ...state,
                orders: updatedOrders
            };
            console.log(returner)
            return returner
        case 'SET_ORDERS': 
            return {
                ...state,
                orders: action.payload
            }

        case 'NEW_ORDER': 
            const newOrders = [...state.orders, action.payload]
            const newState = {
                ...state,
                orders: newOrders
            }
            return newState
        case 'DELETE_ORDER': 
            console.log(action.payload)
            return {
                ...state,
                orders: state.orders.filter(order => order.orderId !== action.payload)
            };
        default: break;
    }
    return state;
}

export default reducer;
