import React from 'react'
import VideoPlayer from './VideoPlayer'
import PropTypes from 'prop-types'
import '../App.css'

function VideoPlayers(props) {

    let videos_same_channel = props.otherVideos;
    let videos = videos_same_channel.map(function(vid){
        return <VideoPlayer videoId={vid.id.videoId} key={vid.id.videoId}/>
    });



    return (
       <div>
           {videos}
       </div>
    )
}

VideoPlayers.propTypes = {
    otherVideos : PropTypes.array.isRequired,
};

export default VideoPlayers;
