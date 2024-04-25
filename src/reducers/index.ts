import { combineReducers } from 'redux';
import visionReducer from './visionReducer';

const rootReducer = combineReducers({
    visionReducer
});

export type RootReducer = ReturnType<typeof rootReducer>

export default rootReducer