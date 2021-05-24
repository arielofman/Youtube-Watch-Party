import { createSlice } from '@reduxjs/toolkit'

export const ChatSlice = createSlice({
    name: 'chat',
    initialState: {
        host: false,
        username: '',

        messages: [],
        message: '',
    },
    reducers: {
        setHost: (state, action) => {
            state.host = action.payload.isHost
        },
        setUsername: (state, action) => {
            state.username = action.payload.username
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload.msg)
        },
        setMessage: (state, action) => {
            state.message = action.payload.msg
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUsername, addMessage, setMessage, setHost } = ChatSlice.actions

export default ChatSlice.reducer