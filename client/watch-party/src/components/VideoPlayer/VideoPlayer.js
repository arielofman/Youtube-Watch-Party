import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import ReactPlayer from 'reactjs-player-v2/youtube'

import { setVideoIsPlaying, setPlayingTitle, setVideoURL } from 'redux/VideoPlayerSlice'

import './VideoPlayer.css';

function VideoPlayer({ socket }) {
    const dispatch = useDispatch()

    const [prevCurrTime, setPrevCurrTime] = useState(0)
    const [currTime, setCurrTime] = useState(0) 

    const remoteControl = useRef(false);
    const playerRef = useRef(null);

    const roomId = useSelector((state) => state.room.roomId)
    const videoURL = useSelector((state) => state.videoPlayer.videoURL)
    const isPlaying = useSelector((state) => state.videoPlayer.isPlaying)
    const username = useSelector((state) => state.chat.username)
    const isHost = useSelector((state) => state.chat.host)

    function updateVideoTitle() {
        const currVideoTitle = playerRef.current.getInternalPlayer().getVideoData().title;
        dispatch(setPlayingTitle({ playingTitle: currVideoTitle }));
    }

    function setPlayerRef(player) {
        playerRef.current = player
    }

    /* currently not being used */
    const checkElapsedTime = (e) => {
        console.log(e.target.playerInfo.playerState);
        const duration = e.target.getDuration();
        const currentTime = e.target.getCurrentTime();
        if (currentTime / duration > 0.55) {
            // do something
        }
    };

    function playVideoHandler() {
        dispatch(setVideoIsPlaying({ playing: true }));

        if (remoteControl.current === false) {

            const newPacket = {
                roomId: roomId,
            };

            socket.emit("client:play", newPacket);
        }
        remoteControl.current = false
    }

    function pauseVideoHandler() {
        dispatch(setVideoIsPlaying({ playing: false }));

        if (remoteControl.current === false) {
            const newPacket = {
                roomId: roomId,
            };

            socket.emit("client:pause", newPacket);
        }
        remoteControl.current = false
    }

    function onProgressHandler() {  
        setPrevCurrTime(currTime)
        setCurrTime(playerRef.current.getCurrentTime())

        const timeDiff = currTime - prevCurrTime

        // If the time diff is large enough or negative, there was probably a scrub event
        // 1.5 = 1 second progress interval + 0.5 threshold 
        if (timeDiff > 1.5 || timeDiff < 0) {
            const newPacket = {
                username: username,
                currentTime: playerRef.current.getCurrentTime(),
                roomId: roomId,
            }

            socket.emit("client:seekTo", newPacket);
        }
    } 

    function onStartHandler() {
        updateVideoTitle()
    }

    function playbackRateChangeHandler() { 
        console.log("Playback was changed")
    }

    function videoStateUpdater() {    
         // request a sync when player is ready
         if (!isHost) {
            socket.emit("client:request-sync", { roomId });
        }

        // host is notified of a request sync and sends out the data
        // the server will only send this privately to hosts
        socket.on("server:request-host-data", () => {

            const newPacket = {
                playing: playerRef.current.props.playing, // using ref cause state wasnt updating inside this func
                currentTime: playerRef.current.getCurrentTime(),
                roomId: roomId,
            }
            socket.emit("client:host-data", newPacket);
        });

        // our host provided us with the data we need to sync up
        socket.on("server:host-data", (packet) => {
            dispatch(setVideoIsPlaying({ playing: packet.playing }));
            playerRef.current.seekTo(packet.currentTime, 'seconds')
        });

        socket.on("server:play", () => {
            remoteControl.current = true;
            dispatch(setVideoIsPlaying({ playing: true }));
        });

        socket.on("server:pause", (packet) => {
            remoteControl.current = true;
            dispatch(setVideoIsPlaying({ playing: false }));
        });

        socket.on("server:seekTo", (packet) => {
            remoteControl.current = true;
            playerRef.current.seekTo(packet.currentTime, 'seconds');
        });

        socket.on("server:video-change", (packet) => {
            remoteControl.current = true;
            dispatch(setVideoURL({ videoCode: packet.videoCode }));
        });
    }

    return (
        <div className="video-container">
            <ReactPlayer
                ref={setPlayerRef}
                width="100%"
                height="100%"
                url={videoURL}
                playing={isPlaying}
                controls={true}
                onReady={videoStateUpdater} 
                onStart={onStartHandler}
                onPlay={playVideoHandler}
                onPause={pauseVideoHandler}
                progressInterval={1000}
                onProgress={onProgressHandler} 
                onPlaybackRateChange={playbackRateChangeHandler}/> 
            {/* <h3>{isHost ? "i am the host!" : "not the host!"}</h3> */}
        </div>
    )
}

export default VideoPlayer
