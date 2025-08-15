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
}