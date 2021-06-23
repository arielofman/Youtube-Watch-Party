import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
 
import { setUsername } from 'redux/ChatSlice'; 

import { Link } from "react-router-dom"; 

import './Login.css'  

function Login(props) { 
    const dispatch = useDispatch()

    const username = useSelector((state) => state.chat.username)
    const [roomName, setRoomName] = useState('')  

    const roomNameChangeHandler = e => {
        setRoomName(e.target.value)
    }

    const usernameChangeHandler = e => {
         dispatch(setUsername({username: e.target.value}))
    } 

    useEffect(() => {
        if(props.location.state) {
            const {roomId} = props.location.state.from;
            setRoomName(roomId);
        }
    }, [])
  
    return (
        <div className="login-container">
            <input type="text" placeholder="Enter a user name" value={username}
                onChange={usernameChangeHandler}
                autoFocus={true}
                className="text-input-field" />
            <input type="text" placeholder="Enter a room name..." value={roomName}
                onChange={roomNameChangeHandler}
                className="text-input-field" />
            <Link to={`/${roomName}`} className="enter-room-button">
                Join Room
            </Link>

        </div>
    )
}

export default Login
