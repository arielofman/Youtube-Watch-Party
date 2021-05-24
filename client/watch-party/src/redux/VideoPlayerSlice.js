import { createSlice } from '@reduxjs/toolkit'
 
const BASE_URL = "https://www.youtube.com/watch?v=";

export const VideoPlayerSlice = createSlice({
    name: 'videoPlayer',
    initialState: {
        videoURL: "http://www.youtube.com/watch?v=5_ARibfCMhw",
        isPlaying: false,
    },
    reducers: {
        setVideoURL: (state, action) => {
            state.videoURL = "http://www.youtube.com/watch?v=".concat(action.payload.videoCode)
        },
        setVideoIsPlaying: (state, action) => {
            state.isPlaying = action.payload.playing
        },
    },
})

// Action creators are generated for each case reducer function
export const { setVideoIsPlaying, setVideoURL } = VideoPlayerSlice.actions

export default VideoPlayerSlice.reducer