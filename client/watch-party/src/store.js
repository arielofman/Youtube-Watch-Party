import { configureStore } from '@reduxjs/toolkit'
 
import ChatReducer from './redux/ChatSlice' 
import RoomSlice from './redux/RoomSlice' 
import SuggestedSlice from './redux/SuggestedSlice' 
import VideoPlayerReducer from './redux/VideoPlayerSlice'

export default configureStore({
  reducer: {
    room: RoomSlice,
    chat: ChatReducer,
    suggested: SuggestedSlice,
    videoPlayer: VideoPlayerReducer, 
  },
}) 