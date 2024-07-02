import { Category } from "../types/Category";
import { User } from "../types/User";

interface State {
    categories: Category[]
}

interface Action {
    type: string; 
    payload?: any; 
}

export const setCategories = (payload: any) =>({
    type: 'SET_CATEGORIES',
    payload
})

export const newCategory = (payload: any)=>({
    type: 'NEW_CATEGORY',
    payload
})
export const updateCategory = (payload: any)=>({
    type: 'UPDATE_CATEGORY',
    payload
})

export const removeCategory = (payload: number)=>({
    type: 'DELETE_CATEGORY',
    payload
})

const initialState: State = {
    categories: []
}

const reducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case 'SET_CATEGORIES': 
            return {
                ...state,
                categories: action.payload
            }

        case 'NEW_CATEGORY': 
            const newCategories = [...state.categories, action.payload]
            const newState = {
                ...state,
                categories: newCategories
            }
            return newState
        case 'UPDATE_CATEGORY':
            return {
                ...state,
                categories: state.categories.map((category) =>
                    category.id === action.payload.id ? action.payload : category
                )
            };
        case 'DELETE_CATEGORY': 
            console.log(action.payload)
            return {
                ...state,
                categories: state.categories.filter(category => category.id !== action.payload)
            };
        default: break;
    }
    return state;
}

export default reducer;
