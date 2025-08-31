'use client'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { createVehicle, closeNewVehicleModal } from '@/store/vehicleSlice'

export default function NewVehicleModal() {
    const dispatch = useAppDispatch()
    const { creating, error } = useAppSelector(state => state.vehicles)
    const [formData, setFormData] = useState({
        make: '',
        model: '',
        year: new Date().getFullYear(),
        price: 0,
        status: 'AVAILABLE' as const
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await dispatch(createVehicle(formData)).unwrap()
            // Modal will close automatically on success via extraReducers
        } catch (error) {
            console.error('Failed to create vehicle:', error)
        }
    }

    const handleClose = () => {
        dispatch(closeNewVehicleModal())
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleClose}>
            <div className="bg-white rounded-lg shadow-xl w-1/3 min-w-96 max-w-md p-8 relative" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                    ×
                </button>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Vehicle</h2>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">Make</label>
                        <input 
                            type="text" 
                            id="make" 
                            value={formData.make}
                            onChange={(e) => setFormData({...formData, make: e.target.value})}
                            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                        <input 
                            type="text" 
                            id="model" 
                            value={formData.model}
                            onChange={(e) => setFormData({...formData, model: e.target.value})}
                            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                        <input 
                            type="number" 
                            id="year" 
                            value={formData.year}
                            onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            min="1900"
                            max={new Date().getFullYear() + 1}
                            required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                        <input 
                            type="number" 
                            id="price" 
                            value={formData.price}
                            onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select 
                            id="status" 
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="AVAILABLE">Available</option>
                            <option value="PENDING">Pending</option>
                            <option value="MAINTENANCE">Maintenance</option>
                            <option value="RESERVED">Reserved</option>
                            <option value="SOLD">Sold</option>
                        </select>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                        <button 
                            type="submit"
                            disabled={creating}

                            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors
                                ${ creating 
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-500 hover:bg-blue-600'
                                }
                                text-white`}
                        >
                            { creating ? 'Creating...' : 'Add Vehicle' }
                        </button>
                        <button 
                            type="button"
                            onClick={handleClose}
                            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}