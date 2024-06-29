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

export const removeCategory = (payload: any)=>({
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
                categors: newCategories
            }
            return newState
        case 'DELETE_CATEGORY': 
            return {
                ...state,
                categories: state.categories.filter(category => category.id !== action.payload)
            };
        default: break;
    }
    return state;
}

export default reducer;
