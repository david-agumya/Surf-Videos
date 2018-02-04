import React from 'react'
import PropTypes from 'prop-types'
import styles from './VideoPlayer.css'

function VideoPlayer(props){

    return (
        <div className={styles.video_panel}>
        <iframe className={styles.video}
                src={`https://www.youtube.com/embed/${props.videoId}`}
                controls="0"
                frameBorder="0"
                allowFullScreen
                title="Surf-Video"> </iframe>
        </div>
    )
}


VideoPlayer.propTypes = {
    videoId : PropTypes.string.isRequired,
};

export default VideoPlayer;