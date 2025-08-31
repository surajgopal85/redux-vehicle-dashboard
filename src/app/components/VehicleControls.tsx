// src/components/VehicleControls.tsx
'use client'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { updateFilter, openNewVehicleModal } from '@/store/vehicleSlice'

export default function VehicleControls() {
  const dispatch = useAppDispatch()
  const { filter, totalCount } = useAppSelector(state => state.vehicles)
  
  const handleAddVehicle = () => {
    console.log('moved to BE API call on form fill')
    dispatch(openNewVehicleModal())
  }

  return (
    <div className="flex gap-4 items-center">
      <button 
          onClick={handleAddVehicle}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Vehicle
      </button>
      <span className="font-medium">Total: {totalCount}</span>
      <input
        type="text"
        placeholder="Search vehicles..."
        value={filter}
        onChange={(e) => dispatch(updateFilter(e.target.value))}
        className="border border-gray-300 px-3 py-2 rounded"
      />
    </div>
  )
}