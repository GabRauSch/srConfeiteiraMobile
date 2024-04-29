interface State {
    message: {message: string, type: 'success' | 'error', visible: boolean}
}

interface Action {
    type: string; 
    payload?: any; 
}

export const toggleVision = (payload: any) => ({
    type: 'SET_MESSAGE',
    payload
});


const initialState: State = {
    message: {message: '', type: 'success', visible: false}
}

const reducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case 'SET_MESSAGE':
                return {
                    ...state,
                    vision: !state.vision
                };
            break;
        default: break;
    }
    return state;
}

export default reducer;
