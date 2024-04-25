interface State {
    vision: boolean
}

interface Action {
    type: string; 
    payload?: any; 
}

export const toggleVision = () => ({
    type: 'TOGGLE_VISION',
});


const initialState: State = {
    vision: false
}

const reducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case 'TOGGLE_VISION':
            console.log('toggle vision')
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
