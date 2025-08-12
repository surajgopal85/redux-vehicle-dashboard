'use client'
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setSelectedVehicleId, setViewMode, setSortBy } from "@/store/dashboardSlice";
import { useAppSelector as selectVehicles } from '../../store/vehicleSlice';

export default function Dashboard() {
    const dispatch = useAppDispatch();

    const { selectedVehicleId, viewMode, sortBy } = useAppSelector(state => state.dashboard);

    const { vehicles } = useAppSelector(state => state.vehicles);

    const handleSelectVehicleId = () => {
        
    }

    return (
        <div>

        </div>
    )
}
