import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setRoomId } from '../../redux/RoomSlice'

import ChatRoom from '../ChatRoom';
import VideoPlayer from '../VideoPlayer';

import './PartyRoom.css';

import socketio from "socket.io-client";
import Suggested from '../Suggested';
import Offline from '../Offline';

const SOCKET_URL = "http://localhost:5000";
let socket = socketio.connect(SOCKET_URL);

function PartyRoom(props) {
    const dispatch = useDispatch()

    const { roomId } = props.match.params;

    const username = useSelector((state) => state.chat.username)

    const [serverStatus, setServerStatus] = useState(false)

    useEffect(() => {
        socket.emit('join', { username: username, roomId }, error => { });
 
        // check if server is online
        setServerStatus(socket.connected);  

        // TODO: Reconnection logic needs work
        // socket.on("connect", () => {
        //     setServerStatus(socket.connected); // true
        //     socket = socketio.connect(SOCKET_URL);
        // });

        socket.on("disconnect", () => {
            setServerStatus(socket.connected); // false
        });
 
        dispatch(setRoomId({ id: roomId }))

    }, [])


    return ( 
        <>
            {serverStatus === true ?
                (<div className="container">
                    {/* <div className="top-bar">
                        Top Bar
                    </div> */}
                    <div className="main">
                        <Suggested socket={socket} />
                        <VideoPlayer socket={socket} />
                        <ChatRoom socket={socket} />
                    </div>
                </div>) : (<Offline />)
            }
        </>
    )
}

export default PartyRoom