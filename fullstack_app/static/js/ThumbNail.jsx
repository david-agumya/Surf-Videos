import React from 'react';
import PropTypes from 'prop-types'
import styles from './ThumbNail.css'
/**
 * ThumbNail COMPONENT TO RENDER A SINGLE ThumbNail JSON
 */
function ThumbNail(props) {

    return (
        <div className={styles.thumbnailStyle}>
            <img src={props.url}
                 alt={props.title}
                 className={styles.imgStyle}
            />
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