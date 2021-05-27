import { createSlice } from '@reduxjs/toolkit'
  
export const SuggestedSlice = createSlice({
    name: 'suggested',
    initialState: {
        searchQuery: '',
    },
    reducers: { 
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload.searchQuery
        },
    },
})

// Action creators are generated for each case reducer function
export const { setSearchQuery } = SuggestedSlice.actions

export default SuggestedSlice.reducer