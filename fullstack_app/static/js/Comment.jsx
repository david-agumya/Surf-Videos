/**
 *  Comment component that contains the comments
 */
import React from 'react'
import PropTypes from 'prop-types'
import {
    Panel,
} from 'react-bootstrap'
import styles from './Comment.css'

function Comment(props) {
    return (
        <Panel>
            <Panel.Body>{props.commentText}</Panel.Body>
            <Panel.Footer> Author : {props.commentAuthor}</Panel.Footer>
        </Panel>
    )
}

Comment.propTypes = {
    commentText : PropTypes.string.isRequired,
    commentAuthor: PropTypes.string.isRequired,
};

export default Comment;