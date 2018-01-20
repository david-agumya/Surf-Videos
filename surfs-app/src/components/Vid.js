import React from 'react';
import PropTypes from 'prop-types'
import '../App.css'
import {
    Link
} from 'react-router-dom'

/**
 * VIDEO COMPONENT TO RENDER A SINGLE VIDEO JSON
 */
function Video(props){

    return (
        <div className="galleryItem">
            <Link to={`/videoDetail/${props.videoId}`}>
            <img src={props.url}
                 alt={props.title}
                  />
            </Link>
            <h3> {props.title} </h3>
            <h4> Description </h4>
            <p> {props.description}</p>
        </div>
    )
}

Video.propTypes = {
    url : PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    title : PropTypes.string.isRequired,
    videoId: PropTypes.string.isRequired,
};

export default Video;