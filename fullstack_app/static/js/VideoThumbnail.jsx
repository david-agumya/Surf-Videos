import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Thumbnail,
    Panel
} from 'react-bootstrap'
import styles from './VideoThumbnail.css'
function VideoThumbnail(props){

    return(
        <div className={styles.container}>
            <Panel>
                <Panel.Body>
                    <div className={styles.player}>
                    <iframe src={`https://www.youtube.com/embed/${props.videoId}`}
                            controls="0"
                            frameBorder="0"
                            allowFullScreen
                            title={props.title}> </iframe>
                    </div>
                </Panel.Body>
                <Panel.Footer>
                    <h3>{props.title}</h3>
                    <p>{props.description}</p>
                </Panel.Footer>
            </Panel>
        </div>
    )
}

VideoThumbnail.propTypes = {
    title : PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    thumbnail_url : PropTypes.string.isRequired,
    videoId: PropTypes.string.isRequired,
};

export default VideoThumbnail;