import { createSlice } from '@reduxjs/toolkit'
  
export const RoomSlice = createSlice({
    name: 'room',
    initialState: {
        roomId: '',
    },
    reducers: {
        setRoomId: (state, action) => {
            state.roomId = action.payload.id
        }, 
    },
})

// Action creators are generated for each case reducer function
export const { setRoomId } = RoomSlice.actions

export default RoomSlice.reducer