import React from 'react';
import Comment from './Comment'
import PropTypes from 'prop-types'

function Comments(props) {

    let comments = props.CommentList.map( (comment) => {
        return <Comment commentText={comment.snippet.topLevelComment.snippet.textDisplay}/>
    });

    return (
        <div>
            <ul>
                {comments}
            </ul>
        </div>
    )
}

Comments.propTypes = {
    CommentList : PropTypes.array.isRequired,
};


export default Comments;
