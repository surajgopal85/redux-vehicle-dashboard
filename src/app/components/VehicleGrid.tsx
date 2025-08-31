// src/components/VehicleGrid.tsx
'use client'

interface Vehicle {
  id: number
  make: string
  model: string
  year: number
  price: number
  status: 'AVAILABLE' | 'SOLD' | 'PENDING' | 'MAINTENANCE' | 'RESERVED'
}

interface VehicleGridProps {
  vehicles: Vehicle[]
  onSelectVehicle: (vehicleId: number) => void
}

export default function VehicleGrid({ vehicles, onSelectVehicle }: VehicleGridProps) {
  if (vehicles.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <p className="text-lg">No vehicles match your search</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map(vehicle => (
        <div
          key={vehicle.id}
          onClick={() => onSelectVehicle(vehicle.id)}
          className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer p-6"
        >
          {/* Vehicle Header */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              {vehicle.year} {vehicle.make}
            </h3>
            <p className="text-lg text-gray-600">{vehicle.model}</p>
          </div>

          {/* Price */}
          <div className="mb-4">
            <p className="text-2xl font-bold text-green-600">
              ${vehicle.price.toLocaleString()}
            </p>
          </div>

          {/* Status Badge */}
          <div className="flex justify-between items-center">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              vehicle.status === 'AVAILABLE' 
                ? 'bg-green-100 text-green-800' 
              : vehicle.status === 'SOLD'
                ? 'bg-red-100 text-red-800'
              : vehicle.status === 'PENDING'
                ? 'bg-yellow-100 text-yellow-800'
              : vehicle.status === 'MAINTENANCE'
                ? 'bg-gray-100 text-gray-800'
              : 'bg-blue-100 text-blue-800'
            }`}>
              {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
            </span>
            
            {/* Click indicator */}
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  )
}