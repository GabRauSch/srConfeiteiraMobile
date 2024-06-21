import { combineReducers } from 'redux';
import visionReducer from './visionReducer';
import userReducer from './userReducer';
import productsReducer from './productsReducer';
import clientsReducer from './clientsReducer'
import ordersReducer from './ordersReducer'
import paymentsReducer from './paymentsReducer'

const rootReducer = combineReducers({
    visionReducer,
    userReducer, productsReducer, clientsReducer, ordersReducer,
    paymentsReducer
});

export type RootReducer = ReturnType<typeof rootReducer>

export default rootReducer