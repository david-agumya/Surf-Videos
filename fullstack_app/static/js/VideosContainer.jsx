import React from 'react'
import PropTypes from 'prop-types'
import VideoThumbNail from './VideoThumbnail.jsx'

function VideosContainer(props) {
    let videos = props.videoList;
    let formatted_videos = videos.map((video) => {
        return <VideoThumbNail
            description={video.description}
            title={video.title}
            thumbnail_url={video.thumbnail_url}
            key={video.videoId}
        />
    });
    return (
        <div>
            {formatted_videos}
        </div>
    )
}

VideosContainer.propTypes = {
    videoList : PropTypes.array.isRequired
};

export default VideosContainer;