// src/components/Dashboard.tsx
'use client'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setSelectedVehicleId, setViewMode, setSortBy } from '@/store/dashboardSlice'
import VehicleControls from './VehicleControls'
import VehicleModal from './VehicleModal'

export default function Dashboard() {
  const dispatch = useAppDispatch()
  
  // dashboard preferences
  const { selectedVehicleId, viewMode, sortBy } = useAppSelector(state => state.dashboard)
  
  // vehicle data
  const { vehicles, filter } = useAppSelector(state => state.vehicles)
  
  // filter & sort
  const filteredVehicles = vehicles.filter(vehicle => 
    vehicle.make.toLowerCase().includes(filter.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(filter.toLowerCase())
  )
  
  // for future sort
  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    switch(sortBy) {
      case 'price': return a.price - b.price
      case 'year': return b.year - a.year
      case 'make': return a.make.localeCompare(b.make)
      default: return 0
    }
  })
  
  const handleSelectVehicle = (vehicleId: number) => {
    dispatch(setSelectedVehicleId(vehicleId))
  }
  
  const closeModal = () => {
    dispatch(setSelectedVehicleId(null))
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Vehicle Dashboard</h1>
      
      <div className="flex justify-between items-center mb-6">
        <VehicleControls />
      </div>

      {/* viewmode here */}
      
      {selectedVehicleId && (
        <VehicleModal 
          vehicleId={selectedVehicleId} 
          onClose={closeModal}
        />
      )}
    </div>
  )
}