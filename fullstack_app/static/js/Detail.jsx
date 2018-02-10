/*
 The Detail component will contain a videos details when a user
 clicks on a thumbnail in the parent home page component
 */

import React from 'react'
import {
    PageHeader,
    Panel,
    Button,
    ButtonToolbar,
} from 'react-bootstrap'
import styles from './Detail.css'
import VideoPlayer from './VIdeoPlayer.jsx'
import CommentList from './CommentLists.jsx'
import VideoContainer from './VideosContainer'
import axios from 'axios'

export default class Details extends React.Component {

    constructor(props){
        super(props);

        let video_Id = this.props.match.params.videoId;
        // let video_url = `https://www.youtube.com/watch?v=${video_Id}`;
        this.getInitialComments = this.getInitialComments.bind(this);
        this.getVideoDetails = this.getVideoDetails.bind(this);
        this.getInitialComments = this.getInitialComments.bind(this);
        this.getOtherVideoThumnails = this.getOtherVideoThumnails.bind(this);
        this.getMoreComments = this.getMoreComments.bind(this);
        this.getNextOtherVideoThumbnails = this.getNextOtherVideoThumbnails.bind(this);
        this.getPrevOtherVideoThumbnails = this.getPrevOtherVideoThumbnails.bind(this);

        this.state = {
            videoId : video_Id,
            videoUrl : '',
            comments: [],
            title : '',
            description: '',
            author: '',
            channelId: '',
            otherVids: [],
        }
    }
    componentDidMount() {
        this.getInitialComments()
    }

    getVideoDetails() {
        axios.get(`/api/v0/getVideoDetails/${this.state.videoId}`)
            .then(responseData => {
                let vid_title = responseData.data.title;
                let vid_author = responseData.data.author;
                let vid_channelId = responseData.data.channelId;
                let vid_description = responseData.data.description;
                this.setState({
                    title: vid_title,
                    author: vid_author,
                    channelId: vid_channelId,
                    description: vid_description
                });
                this.getOtherVideoThumnails()
            })
            .catch((err) => {
            console.log(err);
        })
    }

    getInitialComments() {
            axios.get(`/api/v0/getVideoComments/${this.state.videoId}`)
                .then(responseData => {
                    this.setState({
                        comments : responseData.data
                    });
                    this.getVideoDetails();
                }).catch((err) => {
                console.log(err);
            })
    }

    getMoreComments() {
        axios.get(`/api/v0/getNextComments/${this.state.videoId}`)
            .then(responseData => {
                this.setState({
                    comments : responseData.data
                });
                this.getVideoDetails();
            }).catch((err) => {
            console.log(err);
        })
    }


    getOtherVideoThumnails() {
        axios.get(`/api/v0/getOtherVideoByAuthor/${this.state.channelId}`)
            .then(responseData => {
                this.setState({
                    otherVids : responseData.data
                })
            }).catch((err) => {
            console.log(err)
        })
    }

    getNextOtherVideoThumbnails() {
        axios.get(`/api/v0/getNextOtherVideoByAuthor/${this.state.channelId}`)
            .then(responseData => {
                this.setState({
                    otherVids : responseData.data
                })
            }).catch((err) => {
            console.log(err)
        })
    }

    getPrevOtherVideoThumbnails() {
        axios.get(`/api/v0/getPrevOtherVideoByAuthor/${this.state.channelId}`)
            .then(responseData => {
                this.setState({
                    otherVids : responseData.data
                })
            }).catch((err) => {
            console.log(err)
        })
    }



    render() {
        return (
            <div>
                {/*Main Div*/}
                <div>
                    {/*Header*/}
                    <PageHeader className={styles.DIVheading}>
                        Surf's App
                        <small className={styles.subHeading}> {this.state.title} </small>
                    </PageHeader>
                </div>
                <div>
                    {/*Video Player*/}
                    <VideoPlayer videoId={this.state.videoId}/>
                    <hr/>
                </div>
                <div className={styles.details}>
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
                <div className={styles.comments}>
                    <h3 className={styles.divHeader}> Comments </h3>
                    <hr/>
                    {/*Comments*/}
                    <CommentList CommentList={this.state.comments}/>
                    <Button className={styles.commentButton} onClick={this.getMoreComments}>
                        Load More Comments.</Button>
                </div>
                <div className={styles.otherVideos}>
                    <h3 className={styles.divHeader}> Recommended Videos </h3>
                    <hr/>
                    <VideoContainer  videoList={this.state.otherVids}/>
                    <ButtonToolbar>
                        <Button style={{float: 'left'}}
                                onClick={this.getPrevOtherVideoThumbnails}>
                            Prev
                        </Button>
                        <Button style={{float: 'right'}}
                                onClick={this.getNextOtherVideoThumbnails}>
                            Next
                        </Button>
                    </ButtonToolbar>

                </div>
            </div>
        )
    }
}