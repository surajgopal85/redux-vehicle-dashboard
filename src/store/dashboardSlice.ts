import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// dash interface
interface DashboardState {
    selectedVehicleId: number | null;
    viewMode: 'grid' | 'list';
    sortBy: 'price' | 'year' | 'make';
}

const initialState: DashboardState = {
    selectedVehicleId: null,
    viewMode: 'list',
    sortBy: 'year'
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setSelectedVehicleId: (state, action: PayloadAction<number | null>) => {
            state.selectedVehicleId = action.payload;
        },
        setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
            state.viewMode = action.payload;
        },
        setSortBy: (state, action: PayloadAction<'price' | 'year' | 'make'>) => {
            state.sortBy = action.payload;
        }
    }
})

export const { setSelectedVehicleId, setViewMode, setSortBy } = dashboardSlice.actions;
export default dashboardSlice.reducer;