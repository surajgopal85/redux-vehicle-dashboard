// src/components/VehicleControls.tsx
'use client'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { addVehicle, updateFilter } from '@/store/vehicleSlice'

export default function VehicleControls() {
  const dispatch = useAppDispatch()
  const { filter, totalCount } = useAppSelector(state => state.vehicles)
  
  const handleAddVehicle = () => {
    const newVehicle = {
        id: Date.now(),
        make: ['Toyota', 'Honda', 'Chevrolet', 'Tesla'][Math.floor(Math.random() * 4)],
        model: ['Camry', 'Civic', 'Mustang', 'Model Y'][Math.floor(Math.random() * 4)],
        year: 2020 + Math.floor(Math.random() * 5),
        price: 20000 + Math.floor(Math.random() * 50000),
        status: 'available' as const
      }
      dispatch(addVehicle(newVehicle))
  }

  return (
    <div className="flex gap-4 items-center">
      <span className="font-medium">Total: {totalCount}</span>
      <button 
        onClick={handleAddVehicle}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Vehicle
      </button>
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