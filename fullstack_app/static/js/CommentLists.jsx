/**
 *  Comment list component
 */
import React from 'react';
import Comment from './Comment.jsx'
import PropTypes from 'prop-types'
import {
    ListGroup
} from 'react-bootstrap'

function Comments(props) {
    let comment_list = props.CommentList;
    let comments = comment_list.map( (comment) => {
        return <Comment commentText={comment.text}
                        key={comment.id}
                        commentAuthor={comment.author}/>
        });
    return (
        <div>
            <ListGroup>
                {comments}
            </ListGroup>
        </div>
    )
}
Comments.propTypes = {
    CommentList : PropTypes.array.isRequired,
};
export default Comments;