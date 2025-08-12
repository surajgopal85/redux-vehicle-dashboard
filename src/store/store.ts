import { configureStore } from "@reduxjs/toolkit";
import vehicleReducer from './vehicleSlice';

export const store = configureStore({
    reducer: {
        // add slices here
        vehicles: vehicleReducer
    }
})

// Infer the root state and app dispatch from the store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
