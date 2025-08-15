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

    
}