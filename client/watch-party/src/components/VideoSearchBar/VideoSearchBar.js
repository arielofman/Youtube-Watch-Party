import React from 'react'

import './VideoSearchBar.css'

function VideoSearchBar({ setSearchQuery }) {
    function onEnterHandler(e) {
        if (e.key === 'Enter') {
            setSearchQuery(e.target.value)
        } 
    }

    return (
        <div className="search-container">
            <i className="fa fa-search" aria-hidden="true"></i>
            <input onKeyPress={onEnterHandler} autoComplete="off" className="input-movie-search" id="search" type="search"
                placeholder="Search for a video..." />
        </div>
    )
}

export default VideoSearchBar
