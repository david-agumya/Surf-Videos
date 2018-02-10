import React from 'react'
import PropTypes from 'prop-types'
import VideoThumbNail from './VideoThumbnail.jsx'
import { withRouter } from 'react-router-dom'

 class VideosContainer extends React.Component {
    render() {
        let videos = props.videoList;
        let formatted_videos = videos.map((video) => {
            return <VideoThumbNail
                location={props.location}
                history={props.history}
                videoId={video.videoId}
                description={video.description}
                title={video.title}
                thumbnail_url={video.thumbnail_url}
                key={video.videoId}/>
        });
        return (
            <div>
                {formatted_videos}
            </div>
        )
    }
}

VideosContainer.propTypes = {
    videoList : PropTypes.array.isRequired,
};

export default withRouter(VideosContainer);