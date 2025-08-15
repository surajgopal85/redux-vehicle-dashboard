'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setViewMode } from '@/store/dashboardSlice';

export default function ViewToggle() {
    // pattern:
    // create a dispatch function in order to dispatch an action
    // create a selector to get the current view mode
    // create a toggle function to switch between grid and list
    // return a button with the current view mode
    const dispatch = useAppDispatch();
    const viewMode = useAppSelector(state => state.dashboard.viewMode);

    // simple toggle -> switch between grid and list
    const toggleView = () => {
        dispatch(setViewMode(viewMode === 'grid' ? 'list' : 'grid'));
    }

    return (
        <button 
        onClick={toggleView}
        className='flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors'
        title={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
        >
            {viewMode === 'grid' ? (
                <>
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                    </svg>
                    <span className='hidden sm:inline'>List View</span>
                </>
            ) : (
                <>
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' />
                    </svg>
                    <span className='hidden sm:inline'>Grid View</span>
                </>
            )}
        </button>
    )
}