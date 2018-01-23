import React from 'react';
import Vid from './Vid';
import PropTypes from 'prop-types'
import '../App.css'
import { Grid, Row} from 'react-bootstrap'

function VidList(props) {

    let list_videos_details = props.videoDetails;

    let videos = list_videos_details.map( video => {
            return (
                <Vid url={video.snippet.thumbnails.high.url}
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

VidList.propTypes = {
    videoDetails : PropTypes.array.isRequired,
};


export default VidList;
