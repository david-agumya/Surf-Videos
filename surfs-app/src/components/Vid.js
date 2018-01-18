import React from 'react';
import PropTypes from 'prop-types'
import '../App.css'

/**
 * VIDEO COMPONENT TO RENDER A SINGLE VIDEO JSON
 */
function Video(props){

    return (
        <div className="galleryItem">
            <a href={`https://www.youtube.com/watch?v=${props.videoId}`} target='_blank'>

            <img src={props.url}
                 alt={props.title}
                  />
            </a>
            <h3> {props.title} </h3>
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