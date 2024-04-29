import { combineReducers } from 'redux';
import visionReducer from './visionReducer';
import userReducer from './userReducer';
import productsReducer from './productsReducer'

const rootReducer = combineReducers({
    visionReducer,
    userReducer, productsReducer
});

export type RootReducer = ReturnType<typeof rootReducer>

export default rootReducer