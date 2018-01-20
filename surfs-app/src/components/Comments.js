import React from 'react';
import Comment from './Comment'
import PropTypes from 'prop-types'
import {
    ListGroup
} from 'react-bootstrap'

function Comments(props) {

    let comments = props.CommentList.map( (comment) => {
        return <Comment commentText={comment.snippet.topLevelComment.snippet.textDisplay}
                        key={comment.snippet.topLevelComment.id}/>
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
