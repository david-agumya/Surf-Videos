/*
 The Detail component will contain a videos details when a user
 clicks on a thumbnail in the parent home page component
 */

import React from 'react'
import {
    PageHeader,
} from 'react-bootstrap'
import styles from './Detail.css'
import VideoPlayer from './VIdeoPlayer.jsx'

export default class Details extends React.Component {

    constructor(props){
        super(props);

        let video_Id = this.props.match.params.videoId;
        // let video_url = `https://www.youtube.com/watch?v=${video_Id}`;

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


    render() {
        return (
            <div>
                {/*Main Div*/}
                <div>
                    {/*Header*/}
                    <PageHeader className={styles.DIVheading}>
                        Surf's App
                        <small className={styles.subHeading}> Video Details. | {this.state.videoId}</small>
                    </PageHeader>
                </div>
                <div>
                    {/*Video Player*/}
                    <VideoPlayer videoId={this.state.videoId}/>
                </div>
                <div>
                    {/*Details*/}
                </div>
                <div>
                    {/*Comments*/}
                </div>
                <div>
                    {/*Other videos by Author*/}
                </div>
            </div>
        )
    }
}