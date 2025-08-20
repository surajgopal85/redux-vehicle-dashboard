// src/components/Dashboard.tsx
'use client'
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setSelectedVehicleId, setViewMode, setSortBy } from '@/store/dashboardSlice'
import { fetchVehicles } from '@/store/vehicleSlice'
import VehicleControls from './VehicleControls'
import ViewToggle from './ViewToggle'
import SortDropdown from './SortDropdown'
import VehicleGrid from './VehicleGrid'
import VehicleList from './VehicleList'
import VehicleModal from './VehicleModal'
import NewVehicleModal from './NewVehicleModal'

export default function Dashboard() {
  const dispatch = useAppDispatch()
  
  // dashboard preferences
  const { selectedVehicleId, viewMode, sortBy } = useAppSelector(state => state.dashboard)
  
  // vehicle data
  const { vehicles, filter, loading, error, isNewVehicleModalOpen } = useAppSelector(state => state.vehicles)
  
  // fetch vehicles on mount
  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch])
  
  // if there's an error, show it
  if (error) {
    return <div className='text-red-500'>Error: {error}</div>
  }
  
  
  // if loading, show a loading message
  if (loading) {
    return <div className='text-gray-500'>Loading...</div>
  }
  
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
      
      <div className="flex flex-coljustify-between items-center mb-6">
        <VehicleControls />
        <div className="flex flex-row gap-4">
            <SortDropdown />
            <ViewToggle />
        </div>
      </div>

      {/* viewmode here */}
      {viewMode === 'grid' ? 
        <VehicleGrid vehicles={sortedVehicles} onSelectVehicle={handleSelectVehicle} /> 
        :
        <VehicleList vehicles={sortedVehicles} onSelectVehicle={handleSelectVehicle} />
      }
      
      {selectedVehicleId && (
        <VehicleModal 
          vehicleId={selectedVehicleId} 
          onClose={closeModal}
        />
      )}
      
      {isNewVehicleModalOpen && (
        <NewVehicleModal />
      )}
    </div>
  )
}