import { User } from "../types/User";

interface State {
    user: User | null
}

interface Action {
    type: string; 
    payload?: any; 
}

export const setUser = (payload: any) => ({
    type: 'SET_USER',
    payload
});


const initialState: State = {
    user: null
}

const reducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case 'SET_USER':
                return {
                    ...state,
                    user: action.payload
                };
            break;
        default: break;
    }
    return state;
}

export default reducer;
