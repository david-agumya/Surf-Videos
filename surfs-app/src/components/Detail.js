import React, { Component } from 'react'
import axios from 'axios'
import Comments from './Comments'
import VideoPlayer from './VideoPlayer'
import '../App.css'
import {
    PageHeader,
    Panel,
    Button
} from 'react-bootstrap'
import VideoPlayers from './VIdeoPlayers'



class Detail extends Component {
    constructor(props){
        super(props);

        let video_Id = this.props.match.params.videoId;
        let video_url = `https://www.youtube.com/watch?v=${video_Id}`;

        this.state = {
            videoId : video_Id,
            videoUrl : video_url,
            comments : [],
            nextCommentsTkn: null,
            prevCommentsTkn: null,
            title : '',
            description : '',
            author : '',
            channelId : '',
            otherVids : [],
        }
    }

    componentDidMount(){
        this.getComments()

    }

    getComments = () => {
        axios.get(`https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyCJsPJPZZDSVADy_asq7yti4bYrNy8FLak&textFormat=plainText&part=snippet&videoId=${this.state.videoId}&maxResults=15`)
            .then(responseData => {
                let nextkn = responseData.data.nextPageToken
                this.setState({
                    comments: responseData.data.items,
                    nextCommentsTkn: nextkn,
                });
                this.getVideoInfo()
            }).catch(err => {
            console.log(err)
        });
    };

    getNextComments = () => {
        axios.get(`https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyCJsPJPZZDSVADy_asq7yti4bYrNy8FLak&textFormat=plainText&part=snippet&videoId=${this.state.videoId}&maxResults=15&pageToken=${this.state.nextCommentsTkn}`)
            .then(responseData => {
                let nextkn = responseData.data.nextPageToken;
                this.setState({
                    comments: responseData.data.items,
                    nextCommentsTkn: nextkn,
                });
                this.getVideoInfo()
            }).catch(err => {
            console.log(err)
        });
    };


    getVideoInfo = () => {
        axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${this.state.videoId}&key=AIzaSyCJsPJPZZDSVADy_asq7yti4bYrNy8FLak`)
            .then(responseData => {
                let video_title = responseData.data.items[0].snippet.title;
                let video_desc = responseData.data.items[0].snippet.description;
                let video_author = responseData.data.items[0].snippet.channelTitle;
                let video_channel_id = responseData.data.items[0].snippet.channelId;
                this.setState({
                    title: video_title ,
                    description: video_desc,
                    author: video_author,
                    channelId: video_channel_id,

                });
                this.getOtherVideosByAuthor()
            })
            .catch(err => {
                console.log('Error making request to get video information', err)
            })
    };

    getOtherVideosByAuthor = () => {
       axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCJsPJPZZDSVADy_asq7yti4bYrNy8FLak&channelId=${this.state.channelId}&part=snippet&order=date&maxResults=5`)
       // TODO : Need to use pagination to get the nec
           .then(responseData => {
                let other_vids = responseData.data.items;
                this.setState({
                    otherVids: other_vids,
                })
           }).catch(err => {
               console.log('error retrieving other videos by the same channel', err)
       })
    };

    render () {
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
                <div className="video-details-container">
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">
                                {this.state.title}
                            </Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>{this.state.description}</Panel.Body>
                        <Panel.Footer>Creator : {this.state.author}</Panel.Footer>
                    </Panel>
                </div>
                <div className="comment-container">
                    <h2> Comments </h2>
                    <hr/>
                    <Comments CommentList={this.state.comments}/>
                    <div className="more-comments">
                        {this.state.nextCommentsTkn !== null && this.state.nextCommentsTkn !== undefined &&
                            <Button bsStyle="primary"
                                onClick={this.getNextComments()}> Load More ... </Button>
                        }

                    </div>
                </div>
                <div className="other-videos-container">
                    <h2> Recommended Clips </h2>
                    <hr/>
                    <VideoPlayers otherVideos={this.state.otherVids}/>
                </div>

            </div>
        )
    }
}

export default Detail;
