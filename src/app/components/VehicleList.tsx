// src/components/VehicleList.tsx
'use client'

interface Vehicle {
  id: number
  make: string
  model: string
  year: number
  price: number
  status: 'available' | 'sold' | 'pending'
}

interface VehicleListProps {
  vehicles: Vehicle[]
  onSelectVehicle: (vehicleId: number) => void
}

export default function VehicleList({ vehicles, onSelectVehicle }: VehicleListProps) {
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
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* Table Header */}
      <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
        <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700 uppercase tracking-wide">
          <div className="col-span-4">Vehicle</div>
          <div className="col-span-2">Year</div>
          <div className="col-span-3">Price</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1"></div>
        </div>
      </div>

      {/* Vehicle Rows */}
      <div className="divide-y divide-gray-200">
        {vehicles.map(vehicle => (
          <div
            key={vehicle.id}
            onClick={() => onSelectVehicle(vehicle.id)}
            className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="grid grid-cols-12 gap-4 items-center">
              {/* Vehicle Info */}
              <div className="col-span-4">
                <p className="text-lg font-semibold text-gray-800">
                  {vehicle.make} {vehicle.model}
                </p>
              </div>

              {/* Year */}
              <div className="col-span-2">
                <p className="text-gray-600">{vehicle.year}</p>
              </div>

              {/* Price */}
              <div className="col-span-3">
                <p className="text-lg font-bold text-green-600">
                  ${vehicle.price.toLocaleString()}
                </p>
              </div>

              {/* Status */}
              <div className="col-span-2">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  vehicle.status === 'available' 
                    ? 'bg-green-100 text-green-800' 
                    : vehicle.status === 'sold'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                </span>
              </div>

              {/* Arrow */}
              <div className="col-span-1 text-right">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}