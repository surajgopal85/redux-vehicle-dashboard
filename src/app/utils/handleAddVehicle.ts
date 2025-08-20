import * as z from 'zod';
interface Vehicle {
    id: number;
    make: string;
    model: string;
    year: number;
    price: number;
    status: 'AVAILABLE' | 'SOLD' | 'PENDING' | 'MAINTENANCE' | 'RESERVED';
}

const vehicleFields = [
    'make',
    'model',
    'year',
    'price',
    'status'
]

const addVehicleFormSchema = z.object({
    make: z.string().min(1, { message: 'Make is required' }),
    model: z.string().min(1, { message: 'Model is required' }),
    year: z.number().min(1900, { message: 'Year must be greater than 1900' }),
    price: z.number().min(0, { message: 'Price must be greater than 0' }),
    status: z.enum(['AVAILABLE', 'SOLD', 'PENDING', 'MAINTENANCE', 'RESERVED'], { message: 'Invalid status' })
})

export async function handleAddVehicle(vehicleData: Vehicle) {
    try {
        const validatedData = addVehicleFormSchema.parse(vehicleData);
        const response = await fetch('http://localhost:8080/api/vehicles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validatedData)
        })
    } catch(error) {
        console.error('Error adding vehicle:', error);
        return {
            success: false,
            message: 'Failed to add vehicle'
        }
    }
}