'use client'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addVehicle, markAsSold, removeVehicle, updateFilter } from '@/store/vehicleSlice'

export default function Home() {
  const dispatch = useAppDispatch();

  // destructure state
  const { vehicles, totalCount, filter } = useAppSelector(state => state.vehicles);

  // filter by make/model
  const filteredVehicles = vehicles.filter(v =>
    v.make.toLowerCase().includes(filter.toLowerCase()) ||
    v.model.toLowerCase().includes(filter.toLowerCase())
  )

  // handler for new vehicles
  const handleAddVehicle = () => {
    // random config for new vehicles
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
    <div className='p-8 max-w-4xl m-auto'>
      <h1 className='text-3xl font-bold mb-6'>Vehicle Inventory ({totalCount})</h1>

      <div className='flex gap-4 mb-6'>
        <button
          onClick={handleAddVehicle}
          className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'
        >Add Random Vehicle
        </button>
        <input
          type='text'
          placeholder='Search Vehicles'
          value={filter}
          onChange={(e) => dispatch(updateFilter(e.target.value))}
          className='border border-gray-300 px-3 py-2 rounded flex-1'
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {filteredVehicles.map(v => (
          <div key={v.id} className='border rounded-lg p-4 shadow'>
            <h3 className='font-bold text-lg'>
              {v.year} {v.make} {v.model}
            </h3>
            <p className='text-gray-600'>${v.price.toLocaleString()}</p>
            <p className={`text-sm font-medium ${
              v.status === 'available' ? 'text-green-600' : 
              v.status === 'sold' ? 'text-red-600' : 'text-yellow-600'
            }`}>
              Status: {v.status}
            </p>

            <div className="flex gap-2 mt-3">
              {v.status === 'available' && (
                <button 
                  onClick={() => dispatch(markAsSold(v.id))}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                >
                  Mark Sold
                </button>
              )}
              
              <button 
                onClick={() => dispatch(removeVehicle(v.id))}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredVehicles.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          {filter ? 'No vehicles match your search' : 'No vehicles in inventory'}
        </div>
      )}

    </div>
    
  )
  
} 
