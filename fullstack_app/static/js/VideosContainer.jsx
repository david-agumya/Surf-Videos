import React, { Component } from 'react'
import PropTypes from 'prop-types'
import VideoThumbNail from './VideoThumbnail.jsx'
import {
    Link,
} from 'react-router-dom';

function VideosContainer(props) {
    let videos = props.videoList;
    let formatted_videos = videos.map((video) => {
        return (
            <Link to={`/detail/${video.videoId}`}
                  key={video.videoId}
            >
                <VideoThumbNail
                    videoId={video.videoId}
                    description={video.description}
                    title={video.title}
                    thumbnail_url={video.thumbnail_url}
                    />
            </Link>)
    });
    return (
        <div>
            {formatted_videos}
        </div>
    )
}

VideosContainer.propTypes = {
    videoList: PropTypes.array.isRequired,
};

export default VideosContainer