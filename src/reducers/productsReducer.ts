import { Product } from "../types/Product";
import { User } from "../types/User";

interface State {
    products: Product[]
}

interface Action {
    type: string; 
    payload?: any; 
}

export const setProductInfo = (payload: any) => ({
    type: 'SET_PRODUCT_INFO',
    payload
});

export const setProducts = (payload: any) =>({
    type: 'SET_PRODUCTS',
    payload
})


const initialState: State = {
    products: []
}

const reducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case 'SET_PRODUCT_INFO':
            const {id, ...rest} = action.payload;
            const updatedProducts = state.products.map(product=>{
                if(product.id === id){
                    return {
                        ...product,
                        ...rest
                    }
                } else{
                    return product
                }
            });

            
            const returner =  {
                ...state,
                products: updatedProducts
            };

            console.log(returner)
            return returner
        case 'SET_PRODUCTS': 
            return {
                ...state,
                products: action.payload
            }
        default: break;
    }
    return state;
}

export default reducer;
