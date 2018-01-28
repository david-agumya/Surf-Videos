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

    return (
        <Col xs={12} md={5} lg={5} mdPush={1}>
            <Link to={`/ThumbNailDetail/${props.ThumbNailId}`}>
                <img src={props.url}
                     alt={props.title}
                />
            </Link>
            <h3> {props.title} </h3>
            <h4> Description </h4>
            <p> {props.description}</p>
        </Col>
    )
}

ThumbNail.propTypes = {
    url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    ThumbNailId: PropTypes.string.isRequired,
};

export default ThumbNail;