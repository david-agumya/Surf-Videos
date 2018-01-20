import React from 'react'
import PropTypes from 'prop-types'
import {
    ListGroupItem
} from 'react-bootstrap'


function Comment(props) {
    return (
        <ListGroupItem bsStyle="info">
            {props.commentText}
        </ListGroupItem>
    )
}

Comment.propTypes = {
    commentText : PropTypes.string.isRequired,
};

export default Comment;
