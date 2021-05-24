import { configureStore } from '@reduxjs/toolkit'
 
import ChatReducer from './redux/ChatSlice' 
import RoomSlice from './redux/RoomSlice' 
import VideoPlayerReducer from './redux/VideoPlayerSlice'

export default configureStore({
  reducer: {
    chat: ChatReducer,
    room: RoomSlice,
    videoPlayer: VideoPlayerReducer, 
  },
})