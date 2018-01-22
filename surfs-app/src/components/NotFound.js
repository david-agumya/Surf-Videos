import React from 'react';
import error_pic from '../images/error.jpg'

function NotFound(){
    return (
        <div className="not-found">
            <img className="not-found-img"
                 src={error_pic}
                 alt="404 Page not Available"
            />
            <h2>404 Error | Page Not Found</h2>
            <p> Please check network connection</p>
        </div>
    )
}

export default NotFound;