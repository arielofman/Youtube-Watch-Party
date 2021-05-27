import React from 'react'

import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'
import { setVideoURL, setPlayingTitle } from '../../../redux/VideoPlayerSlice'

import './SuggestedVideo.css'

function SuggestedVideo({ video, socket }) {
  const dispatch = useDispatch()

  const roomId = useSelector((state) => state.room.roomId)

  function changeVideoHandler() { 
    socket.emit("client:video-change", { videoCode: video.videoCode, roomId: roomId });

    dispatch(setVideoURL({
      videoCode: video.videoCode
    }));

    dispatch(setPlayingTitle({ playingTitle: video.title }));
  }
 
  return (
    <a onClick={changeVideoHandler}>
      <div className="suggested-video-container">
        <div className="overlay-play">
          <img src="/playbutton.png" alt=""></img>
        </div>
        <div className="suggested-video-img">
          <img src={video.thumbnail} alt=""></img>
        </div>
        <div className="suggested-video-title">
          {video.title}
        </div>
        <div className="suggested-channel">
          {video.channelTitle}
        </div>
        <div className="suggested-stats-container">
          <div className="suggested-views">
            {video.views}
          </div>
          <div className="suggested-year">
            {video.published}
          </div>
        </div>
      </div>
    </a>
  )
}

export default SuggestedVideo
