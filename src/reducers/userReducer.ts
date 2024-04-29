import { User } from "../types/User";

interface State {
    user: User
}

interface Action {
    type: string; 
    payload?: any; 
}

export const toggleVision = () => ({
    type: 'TOGGLE_VISION',
});


const initialState: State = {
    user: {id: 1, planId: 1, email: 'tal@gmail', phone: '', userPermission: 1, name: 'name'}
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
