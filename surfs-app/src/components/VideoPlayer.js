import React from 'react'
import PropTypes from 'prop-types'

function VideoPlayer(props){

    return (
        <iframe className="video-panel"
                src={`https://www.youtube.com/embed/${props.videoId}`}
                controls="0"
                frameBorder="0"
                allowFullScreen
                title="Surf-Video"> </iframe>
    )
}


VideoPlayer.propTypes = {
    videoId : PropTypes.string.isRequired,
};

export default VideoPlayer;