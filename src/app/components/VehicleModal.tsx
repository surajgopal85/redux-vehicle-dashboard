'use client'
import { useAppSelector } from "@/store/hooks";

interface Vehicle {
    id: number;
    make: string;
    model: string;
    year: number;
    price: number;
    status: 'AVAILABLE' | 'SOLD' | 'PENDING' | 'MAINTENANCE' | 'RESERVED';
}

interface VehicleModalProps {
    vehicleId: number;
    onClose: () => void;
}

export default function VehicleModal({ vehicleId, onClose}: VehicleModalProps) {
    const vehicle = useAppSelector(state => state.vehicles.vehicles.find(v => v.id === vehicleId));

    // if no vehicle return null
    if(!vehicle) return null;

    const handleOverlayClick = (e: React.MouseEvent) => {
        if(e.target === e.currentTarget) {
            onClose()
        }
    }


    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={handleOverlayClick}
        >
            {/* Modal Card (1/3 width, centered) */}
            <div className="bg-white rounded-lg shadow-xl w-1/3 min-w-96 max-w-md p-8 relative">
                {/* Close Button */}
                <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                ×
                </button>

                {/* Vehicle Details */}
                <div className="space-y-6">
                {/* Header */}
                <div className="text-center border-b pb-4">
                    <h2 className="text-3xl font-bold text-gray-800">
                    {vehicle.year} {vehicle.make}
                    </h2>
                    <p className="text-xl text-gray-600 mt-1">
                    {vehicle.model}
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Price</p>
                    <p className="text-2xl font-bold text-green-600">
                        ${vehicle.price.toLocaleString()}
                    </p>
                    </div>

                    <div className="text-center">
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Year</p>
                    <p className="text-2xl font-bold text-gray-800">
                        {vehicle.year}
                    </p>
                    </div>

                    <div className="text-center">
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Make</p>
                    <p className="text-xl font-semibold text-gray-800">
                        {vehicle.make}
                    </p>
                    </div>

                    <div className="text-center">
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Model</p>
                    <p className="text-xl font-semibold text-gray-800">
                        {vehicle.model}
                    </p>
                    </div>
                </div>

                {/* Status Badge */}
                <div className="text-center">
                    <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">Status</p>
                    <span className={`inline-block px-4 py-2 rounded-full text-lg font-medium ${
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
                </div>

                {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                        Edit Vehicle
                        </button>
                        <button className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                        View History
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}