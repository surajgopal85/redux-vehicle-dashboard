import { configureStore } from "@reduxjs/toolkit";
import vehicleReducer from './vehicleSlice';
import Dashboard from "@/app/components/Dashboard";
import dashboardReducer from './dashboardSlice';

export const store = configureStore({
    reducer: {
        // add slices here
        vehicles: vehicleReducer, 
        dashboard: dashboardReducer
    }
})

// Infer the root state and app dispatch from the store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
