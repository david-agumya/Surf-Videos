import React from 'react';
import PropTypes from 'prop-types';
import {
    Thumbnail,
} from 'react-bootstrap'
import {
    Link,
    withRouter
} from 'react-router-dom'

function VideoThumbnail(props){
    function handleClick(e){
        e.preventDefault();
        props.history.push(`/detail/${props.videoId}`)
    }

    return(
        <div>
            <Link to={`/detail/${props.videoId}`}>
            <Thumbnail src={props.thumbnail_url}
                       alt={props.title}>
                <h3>{props.title}</h3>
                <p>{props.description}</p>
            </Thumbnail>
            </Link>
        </div>
    )
}

VideoThumbnail.propTypes = {
    title : PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    thumbnail_url : PropTypes.string.isRequired,
    videoId: PropTypes.string.isRequired,
};

export default withRouter(VideoThumbnail);