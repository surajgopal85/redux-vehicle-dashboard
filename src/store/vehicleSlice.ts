import { createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";

interface Vehicle {
    id: number;
    make: string;
    model: string;
    year: number;
    price: number;
    status: 'AVAILABLE' | 'PENDING' | 'SOLD' | 'MAINTENANCE' | 'RESERVED';
}

interface VehicleState {
    vehicles: Vehicle[];
    totalCount: number;
    filter: string;
    loading: boolean;
    error: string | null;
}

const initialState: VehicleState = {
    vehicles: [],
    totalCount: 0,
    filter: '',
    loading: false,
    error: null
}

// async thunk
export const fetchVehicles = createAsyncThunk(
    'vehicles/fetchVehicles',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch('http://localhost:8080/api/vehicles');
            
            // Check if the response is ok (status 200-299)
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ message: 'Network error'}))
                return rejectWithValue({
                    status: res.status,
                    message: errorData.message || `HTTP error status: ${res.status}`
                })
            }
            
            // Parse the JSON response
            const data = await res.json();
            return data;
        } catch (error) {
            // Handle network errors or JSON parsing errors
            console.error('Fetch vehicles error:', error);
            return rejectWithValue({
                status: 500,
                message: error instanceof Error ? error.message : 'Unknown error occurred'
            });
        }
    }
)

export const createVehicle = createAsyncThunk(
    'vehicles/createVehicle',
    async (vehicleData: Vehicle, { rejectWithValue }) => {
        try {
            const res = await fetch('http://localhost:8080/api/vehicles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vehicleData)
            })

            if (!res.ok) {
                const errorData = await res.json()
                return rejectWithValue(errorData)
            }
            return await res.json();
        } catch(error) {
            return rejectWithValue({
                status: 500,
                message: error instanceof Error ? error.message : 'Network error'
            })
        }
    }
)

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
                vehicle.status = 'SOLD';
            }
        },
        markAsPending: (state, action: PayloadAction<number>) => {
            const vehicle = state.vehicles.find(v => v.id === action.payload);
            if (vehicle) {
                vehicle.status = 'PENDING';
            }
        },
        markAsMaintenance: (state, action: PayloadAction<number>) => {
            const vehicle = state.vehicles.find(v => v.id === action.payload)
            if (vehicle) {
                vehicle.status = 'MAINTENANCE';
            }
        },
        markAsReserved: (state, action: PayloadAction<number>) => {
            const vehicle = state.vehicles.find(v => v.id === action.payload)
            if (vehicle) {
                vehicle.status = 'RESERVED';
            }
        }
    },
    extraReducers: (builder) => {
        // thunk states for fetchVehicles
        // builder is a function that allows us to add cases to the slice
        builder
            .addCase(fetchVehicles.pending, (state) => {
                // if it's pending, loading = true
                state.loading = true;
            })
            .addCase(fetchVehicles.fulfilled, (state, action) => {
                // if it's fulfilled, loading = false PLUS it's completed so there's an action payload
                state.loading = false;
                state.vehicles = action.payload;
                state.totalCount = action.payload.length;
                state.error = null;
            })
            .addCase(fetchVehicles.rejected, (state, action) => {
                console.error('Failed to fetch vehicles:', action.payload);
                state.loading = false;
                state.error = (action.payload as any)?.message || 'Failed to fetch vehicles';
            });
    }
})

export const { addVehicle, removeVehicle, updateFilter, markAsSold, markAsPending, markAsMaintenance, markAsReserved } = vehicleSlice.actions;
export default vehicleSlice.reducer;