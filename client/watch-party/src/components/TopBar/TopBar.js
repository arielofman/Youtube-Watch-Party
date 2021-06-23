import React from 'react' 
import { useSelector, useDispatch } from 'react-redux' 

import { setMovieMode } from 'redux/RoomSlice'

import './TopBar.css'
 
function TopBar() { 
    const dispatch = useDispatch()

    const playingTitle = useSelector((state) => state.videoPlayer.playingTitle)
    const currMovieMode = useSelector((state) => state.room.movieMode)

    function movieModeHandler() {
        dispatch(setMovieMode({movieMode: !currMovieMode})); 
    }

    return (
        <div className="top-bar">
          <div className="left-top-bar">
            <button onClick={movieModeHandler} className="theatre-btn"><i className="fa fa-tv" aria-hidden="true"></i></button>
            <div className="currently-watching"><span className="bold">Currently Playing:</span> {playingTitle}</div>
          </div>
          <div className="profile-container">
            <img className="profile-pic-img" src="./profile1.jpg" alt=""/>
            <div className="profile-details">
            </div>
          </div>
        </div>
    )
}

export default TopBar
