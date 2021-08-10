import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {phone} from "./phoneReducer";



const rootReducer = combineReducers({
    phone,
});

export const store = configureStore({
    reducer: rootReducer,
});


type RootReducer = typeof rootReducer
export type AppStateType = ReturnType<RootReducer>