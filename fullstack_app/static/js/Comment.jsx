/**
 *  Comment component that contains the comments
 */
import React from 'react'
import PropTypes from 'prop-types'
import {
    ListGroupItem
} from 'react-bootstrap'
import styles from './Comment.css'

function Comment(props) {
    return (
        <ListGroupItem bsStyle="info">
            <p className={styles.commentAuthor}>
                Author : {props.commentAuthor}
                </p>
            <p className={styles.commentText}>
                {props.commentText}
                </p>
        </ListGroupItem>
    )
}

Comment.propTypes = {
    commentText : PropTypes.string.isRequired,
    commentAuthor: PropTypes.string.isRequired,
};

export default Comment;