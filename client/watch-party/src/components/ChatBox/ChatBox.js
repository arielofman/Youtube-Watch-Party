import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addMessage, setMessage, setHost } from 'redux/ChatSlice'; 

import Identicon from 'react-identicons';

import './ChatBox.css'

function ChatBox({ socket }) {
    const dispatch = useDispatch()  

    const [totalUsers, setTotalUsers] = useState(0);

    const username = useSelector((state) => state.chat.username)

    const messages = useSelector((state) => state.chat.messages)
    const message = useSelector((state) => state.chat.message)

    const roomId = useSelector((state) => state.room.roomId)
    
    const ref = React.useRef(null);

    // Randomly chosen foreground colours for profile pic
    const profileFgPalette = ["#4c96ed", "#ed4ceb", "#4cede7", "#ede517", "#ed5417", "#e52925"]

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTo(0, ref.current.scrollHeight, "auto");
        }
    }, [messages])

    useEffect(() => {

        socket.on("server:new-joiner", (packet) => {
            const newPacket = { username: packet.username, content: packet.content, time: packet.time, isServer: packet.isServer }

            dispatch(addMessage({ msg: newPacket }));
        });

        socket.on("server:total-users", (packet) => { 
            setTotalUsers(packet.totalUsers)
        }); 

        socket.on("server:promote-to-host", () => { 
            dispatch(setHost({ isHost: true })); 
        });  

        socket.on("server:disconnected", (packet) => {
            const newPacket = { username: packet.username, content: packet.content, time: packet.time, isServer: packet.isServer }

            dispatch(addMessage({ msg: newPacket }));
        });

        socket.on("server:message", (packet) => {
            const newPacket = { username: packet.username, content: packet.content, time: packet.time, isServer: packet.isServer }

            dispatch(addMessage({ msg: newPacket }));
        });
    }, [])

    function sendMessage(e) {
        e.preventDefault();

        const newPacket = {
            username: username,
            content: message,
            roomId: roomId,
            isServer: false,
        };

        socket.emit("client:message", newPacket);

        dispatch(addMessage({ msg: newPacket }));

        dispatch(setMessage({ msg: '' }));
    }

    return (
        <div className="chatbox-container">

            <div className="room-info">
                <div className="title">
                    # {roomId}
                </div>
                <div className="online-users">
                    {totalUsers} {totalUsers == 1 ? "User" : "Users"}
                </div>
            </div>
            <div ref={ref} className="messages">

                {messages.map((msg) => (
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
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <div className="send-message-container">
                    <input autoFocus={true} type="text" value={message} onChange={e => dispatch(setMessage({ msg: e.target.value }))} placeholder="Write your message..."></input>
                    <button>Send</button>
                </div>
            </form>
        </div>
    )
}

export default ChatBox
