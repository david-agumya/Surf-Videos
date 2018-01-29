import React from 'react';
import PropTypes from 'prop-types'
import {
    Link,
} from 'react-router-dom'
import {
    Col,
} from 'react-bootstrap'
/**
 * ThumbNail COMPONENT TO RENDER A SINGLE ThumbNail JSON
 */
function ThumbNail(props) {


    let thumbnailStyle = {
        display: 'inline-block',
        margin: '6% 4%',
        border: '1px solid black',
        width: '40%',
        boxSizing: 'border-box',
        float: 'left',
    };
    let imageStyle = {
        width: '100%',
    };

    let textStyle = {
        margin: '1%'
    };
    let titleTextStyle = {
        margin: '1%',
        textDecoration: 'underline',
    };


    return (
        <div style={thumbnailStyle}>
            <img src={props.url}
                 alt={props.title}
                 style={imageStyle}
            />
            <h3 style={titleTextStyle}> {props.title} </h3>
            <h4 style={textStyle}> Description </h4>
            <p style={textStyle}> {props.description}</p>
        </div>
    )
}

ThumbNail.propTypes = {
    url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    videoId: PropTypes.string.isRequired,
};

export default ThumbNail;