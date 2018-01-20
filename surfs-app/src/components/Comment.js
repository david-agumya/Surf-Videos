import React from 'react'
import PropTypes from 'prop-types'


function Comment(props) {
    return (
        <li className="videoComment">
            {props.commentText}
        </li>
    )
}

Comment.propTypes = {
    commentText : PropTypes.string.isRequired,
};

export default Comment;
