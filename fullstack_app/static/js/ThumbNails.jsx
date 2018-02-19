import React from 'react';
import Thumbnail from './ThumbNail.jsx';
import PropTypes from 'prop-types'
import styles from './ThumbNails.css'
function ThumbNails(props) {

    let list_videos_details = props.videoDetails;
    let videos = list_videos_details.map(video => {
        return (
            <Thumbnail
                className={styles.thumbnail}
                url={video.thumbnails.url}
                description={video.description}
                title={video.title}
                videoId={video.videoId}
                key={video.videoId}
            />
        )
    });

    return (

        <div className={styles.thumbnail_container}>
                {videos}
        </div>

    )
}

ThumbNails.propTypes = {
    videoDetails: PropTypes.array.isRequired,
};


export default ThumbNails;