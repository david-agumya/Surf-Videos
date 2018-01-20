import React, { Component } from 'react'
import axios from 'axios'
import Comments from './Comments'
import VideoPlayer from './VideoPlayer'
import '../App.css'
import {
    PageHeader
} from 'react-bootstrap'


class Detail extends Component {
    constructor(props){
        super(props);

        let video_Id = this.props.match.params.videoId;
        let video_url = `https://www.youtube.com/watch?v=${video_Id}`;

        this.state = {
            videoId : video_Id,
            videoUrl : video_url,
            comments : [],
        }
    }

    componentDidMount(){
        axios.get(`https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyCJsPJPZZDSVADy_asq7yti4bYrNy8FLak&textFormat=plainText&part=snippet&videoId=${this.state.videoId}&maxResults=50`)
            .then(responseData => {
                this.setState({
                    comments : responseData.data.items
                })
            }).catch(err => {
            console.log("Error fetching and parsing data", err)
        })
    }

    render() {
        return (
            <div className="detail-container">

                <div className="detail-header">
                    <PageHeader>
                        Video Detail
                    </PageHeader>
                </div>
                <div className="video-container">
                    <VideoPlayer videoId={this.state.videoId}/>
                </div>
                <hr/>
                <h2> Comments </h2>
                <hr/>
                <Comments CommentList={this.state.comments}/>
            </div>
        )
    }
}

export default Detail;
