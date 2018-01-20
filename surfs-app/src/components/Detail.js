import React, { Component } from 'react'
import axios from 'axios'


class Detail extends Component {
    constructor(props){
        super(props);
        this.state = {
            videoId : this.props.match.params.videoId,
            videoUrl : `https://www.youtube.com/watch?v=${videoId}`,
            comments : [],
        }
    }

    componentDidMount(){
        // axios.get(`https://www.googleapis.com/youtube/v3/commentThreads?key=&textFormat=plainText&part=snippet&videoId=kffacxfA7G4&maxResults=50`)
        //     .then(responseData => {
        //         let videosList = responseData.data.items;
        //         this.setState({
        //             vidList : videosList
        //         });
        //     }).catch(err => {
        //     console.log("Error fetching and parsing data", err)
        // })
    }

    render() {
        return (
            <div className="detail-container">
                <div className="detail-header">
                    <h1> Video Detail Page </h1>
                </div>

                <div className="video-container">
                    <!-- Simple video example -->
                    <video src={videoUrl}
                           autoplay
                           poster="posterimage.jpg">
                        Sorry, your browser doesn't support embedded videos,
                        but don't worry, you can <a href={videoUrl}>download it</a>
                        and watch it with your favorite video player!
                    </video>
                </div>

                <p>{`Video Details of ${videoId}`}</p>
            </div>
        )
    }
}

export default Detail;
