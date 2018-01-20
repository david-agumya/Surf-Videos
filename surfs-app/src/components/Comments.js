import React, { Component } from 'react';
import Comment from './Comment'


function Comments(props) {

    let comments = props.CommentList.map( (comment) => {
        return <Comment commentText={comment}/>
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
