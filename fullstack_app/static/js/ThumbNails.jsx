import React from 'react';
import Thumbnail from './ThumbNail.jsx';
import PropTypes from 'prop-types'
import {Grid, Row} from 'react-bootstrap'

function ThumbNails(props) {

    let list_videos_details = props.videoDetails;

    let videos = list_videos_details.map(video => {
        return (
            <Thumbnail url={video.snippet.thumbnails.high.url}
                       description={video.snippet.description}
                       title={video.snippet.title}
                       videoId={video.id.videoId}
                       key={video.id.videoId}
            />
        )
    });

    return (

        <Grid className="container">
            <Row>
                {videos}
            </Row>
        </Grid>

    )
}

ThumbNails.propTypes = {
    videoDetails: PropTypes.array.isRequired,
};


export default ThumbNails;