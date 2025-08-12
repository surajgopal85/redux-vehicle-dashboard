import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Vehicle {
    id: number;
    make: string;
    model: string;
    year: number;
    price: number;
    status: 'available' | 'pending' | 'sold';
}

interface VehicleState {
    vehicles: Vehicle[];
    totalCount: number;
    filter: string;
}

const initialState: VehicleState = {
    vehicles: [],
    totalCount: 0,
    filter: ''
}

const vehicleSlice = createSlice({
    name: 'vehicles',
    initialState,
    reducers: {
        addVehicle: (state, action: PayloadAction<Vehicle>) => {
            state.vehicles.push(action.payload);
            state.totalCount++;
        },
        removeVehicle: (state, action: PayloadAction<number>) => {
            state.vehicles = state.vehicles.filter(v => v.id !== action.payload);
            state.totalCount--;
        },
        updateFilter: (state, action: PayloadAction<string>) => {
            state.filter = action.payload;
        },
        markAsSold: (state, action: PayloadAction<number>) => {
            const vehicle = state.vehicles.find(v => v.id === action.payload);
            if (vehicle) {
                vehicle.status = 'sold';
            }
        }
    }
})

export const { addVehicle, removeVehicle, updateFilter, markAsSold } = vehicleSlice.actions;
export default vehicleSlice.reducer;