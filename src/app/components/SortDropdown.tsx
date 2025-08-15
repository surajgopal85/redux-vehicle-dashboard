// use client because we're using hooks
'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSortBy } from '@/store/dashboardSlice';

export default function SortDropdown() {
    const dispatch = useAppDispatch();
    const sortBy = useAppSelector(state => state.dashboard.sortBy);

    const sortOptions = [
        { value: 'year', label: 'Year (Newest First)'},
        { value: 'price', label: 'Price (Low to High)'},
        { value: 'make', label: 'Make (A-Z)'}
    ] as const;

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSortBy(e.target.value as 'price' | 'year' | 'make'));
    }

    return (
        <div className='flex items-center gap-2'>
            <label htmlFor='sort-select' className='text-sm font-medium text-gray-700'>
                Sort By:
            </label>
            <select
                id='sort-select'
                value={sortBy}
                onChange={handleSortChange}
                className='border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            >
                {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}