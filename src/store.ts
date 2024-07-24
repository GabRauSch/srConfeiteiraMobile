import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/index';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

const middleware: any = [];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(reduxImmutableStateInvariant());
}

const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
