import React from 'react' 
import { useSelector, useDispatch } from 'react-redux' 

import { setMovieMode } from '../../redux/RoomSlice'


import './TopBar.css'
 
function TopBar() { 
    const dispatch = useDispatch()

    const playingTitle = useSelector((state) => state.videoPlayer.playingTitle)
    const currMovieMode = useSelector((state) => state.room.movieMode)

    function movieModeHandler() {
        dispatch(setMovieMode({movieMode: !currMovieMode})); 
    }

    return (
        <div class="top-bar">
          <div class="left-top-bar">
            <button onClick={movieModeHandler} class="theatre-btn"><i class="fa fa-tv" aria-hidden="true"></i></button>
            <div class="currently-watching"><span class="bold">Currently Playing:</span> {playingTitle}</div>
          </div>
          <div class="profile-container">
            <img class="profile-pic-img" src="./profile1.jpg" alt=""/>
            <div class="profile-details">
               
            </div>
          </div>
        </div>
    )
}

export default TopBar
