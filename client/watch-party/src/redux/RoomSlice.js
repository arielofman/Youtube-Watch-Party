import { createSlice } from '@reduxjs/toolkit'
  
export const RoomSlice = createSlice({
    name: 'room',
    initialState: {
        roomId: '',
        movieMode: false,
    },
    reducers: {
        setRoomId: (state, action) => {
            state.roomId = action.payload.id
        }, 
        setMovieMode: (state, action) => {
            state.movieMode = action.payload.movieMode
        },
    },
})

// Action creators are generated for each case reducer function
export const { setRoomId, setMovieMode } = RoomSlice.actions

export default RoomSlice.reducer