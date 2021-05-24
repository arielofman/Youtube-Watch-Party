import React, { useEffect, useState } from 'react'

import { scrapeVideos } from '../../libs/youtubeV3/YoutubeScraper'
import SuggestedVideo from './SuggestedVideo'

import './Suggested.css'

function Suggested( {socket} ) {
    const [videos, setVideos] = useState([])
    const [searchQuery, setSearchQuery] = useState('zhu') // huge zhu fan
    
    useEffect(() => { 
        scrapeVideos(searchQuery, 10).then((data) => {   
            data.map((item) => {
                const newVideo = {
                    videoCode: item.video.id,
                    title: item.video.title,
                    channelTitle: item.uploader.username,
                    published: item.video.upload_date,
                    thumbnail: item.video.thumbnail_src,
                    duration: item.video.duration,
                    views: item.video.views
                }  
                setVideos(prevVideos => [...prevVideos, newVideo]);

            })

        }, (err) => {
            console.error(err);
        })
    }, [])

    return (
        <div className="suggested-container hide">
            { videos.map((video) => {
                return <SuggestedVideo key={video.videoCode} socket={socket} video={video} />
            })
            }
        </div>
    )
}

export default Suggested
