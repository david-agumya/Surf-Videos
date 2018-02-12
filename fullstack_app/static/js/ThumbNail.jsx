import React from 'react';
import PropTypes from 'prop-types'
import styles from './ThumbNail.css'
import {
    Link,
} from 'react-router-dom'
/**
 * ThumbNail COMPONENT TO RENDER A SINGLE ThumbNail JSON
 */
function ThumbNail(props) {

    return (
        <div className={styles.thumbnailStyle}>
            <Link to={`/detail/${props.videoId}`}>
                <img src={props.url}
                     alt={props.title}
                     className={styles.imgStyle}
                />
            </Link>
            <h3 className={styles.titleTextStyle}> {props.title} </h3>
            <h4 className={styles.textStyle}> Description </h4>
            <p className={styles.textStyle}> {props.description}</p>
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