import React from 'react';
import PropTypes from 'prop-types';
import {
    Thumbnail,
} from 'react-bootstrap'
function VideoThumbnail(props){

    return(
        <div>
            <Thumbnail src={props.thumbnail_url}
                       alt={props.title}>
                <h3>{props.title}</h3>
                <p>{props.description}</p>
            </Thumbnail>
        </div>
    )
};

VideoThumbnail.propTypes = {
    title : PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    thumbnail_url : PropTypes.string.isRequired
};

export default VideoThumbnail;