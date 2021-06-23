import React from 'react'

import Identicon from 'react-identicons';

import './Message.css'

function Message({msg}) {

    // Randomly chosen foreground colours for profile pic
    const profileFgPalette = ["#4c96ed", "#ed4ceb", "#4cede7", "#ede517", "#ed5417", "#e52925"]
    
    return (
        <div className="message-container">
            <div className="profile">
                {msg.isServer ? <img src="systemProfile.jpg" alt=""></img> : <Identicon palette={profileFgPalette} size={40} bg="#35395e" string={msg.username} />}
            </div>
            <div className="message-content">
                <div className="message-top-content">
                    <div className="username">{msg.username ? msg.username : "Unknown"}</div>
                    <div className="time">{msg.time}</div>
                </div>
                <div className="message">
                    {msg.content}
                </div>
            </div>
        </div>
    )
}

export default Message
