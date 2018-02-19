import React, { Component } from "react";
import {
    PageHeader,
    Button
} from 'react-bootstrap'

import SearchForm from './SearchForm.jsx'
import axios from 'axios'
import ThumbNails from './ThumbNails.jsx'
import {withRouter} from 'react-router-dom'
import styles from './Home.css'

/*
 Main component responsible for rendering the home page of surfing videos
 */
class Home extends Component {

    constructor(props) {
        super(props);
        this.getNextVideos = this.getNextVideos.bind(this);
        this.getPreviousVideos = this.getPreviousVideos.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.formatSearch = this.formatSearch.bind(this);
        this.state = {
            vidInfo: [],
            prePageCounter: 1,
        }
    }

    /*
     When page loads, initial call is made to populate list of videos to display
     on page
     */
    componentDidMount() {
        axios.get('/api/v0/getVideos')
            .then(responseData => {
                this.setState({
                    vidInfo: responseData.data
                })
            }).catch(err => {
            console.log("/getVideos : ", err);
            alert('Ops : Unable to get videos from youtube, Server internet connection down')
        })
    }

    /*
     Event handler for when the user wants to the next page of videos
     Makes a call to backend route and changes list of videos in state
     */
    getNextVideos() {
        axios.get('/api/v0/getMoreVideos')
            .then(responseData => {
                this.setState({
                    vidInfo: responseData.data,
                    prePageCounter: this.state.prePageCounter + 1,
                })
            }).catch(err => {
            console.log("/getMoreVideos : ", err);
            alert('Unable to get next videos')
        });
    };

    /*
     Event handler for when the user wants to the previous page of videos
     Makes a call to backend route and changes list of videos in state
     */
    getPreviousVideos() {
        axios.get('/api/v0/getPreviousVideos')
            .then(responseData => {
                this.setState({
                    vidInfo: responseData.data,
                    prePageCounter: this.state.prePageCounter - 1,
                })
            }).catch(err => {
            console.log("/getPreviousVideos : ", err);
            alert('Unable to get previous videos')
        })
    };

    /*
     Helper function with promise to help me format the search term entered by user
     needed a promise to make sure route search term is not undefined before making the
     request
     */
    formatSearch(term) {
        return new Promise((resolve, reject) => {
            let route = "/api/v0/search/" + term;
            resolve(route)
        })
    };

    /*
     Event handler for when the user wants to for surf videos with a specific term
     Makes a call to backend route and changes list of videos in statenpm r
     */
    handleSearch(searchTerm) {
        this.formatSearch(searchTerm)
            .then((route) => {
                axios.get(route)
                    .then(responseData => {
                        this.setState({
                            vidInfo: responseData.data,
                            prePageCounter: 0,
                        })
                    }).catch(err => {
                    console.log("/search : ", err);
                    alert('Unable to execute search')
                })
            })
    }


    render() {
        return (
            <div className={styles.div_container}>

                <div className={styles.DIVheader}>
                    <PageHeader className={styles.DIVheading}>
                        Surf's App
                        <small className={styles.subHeading}> A youtube surf video utility.</small>
                    </PageHeader>
                    <div className="search-form">
                        <SearchForm search={this.handleSearch}/>
                    </div>
                    <hr/>
                </div>

                <div className={styles.videoThumbnails}>
                    <ThumbNails videoDetails={this.state.vidInfo}/>
                </div>
                <div className={styles.buttonDiv}>
                    <div className={styles.prevButtonDiv}>
                        {this.state.prePageCounter > 1 &&
                        <Button
                            bsStyle="primary"
                            onClick={this.getPreviousVideos}
                        >Previous
                        </Button>
                        }
                    </div>

                    <div className={styles.pageNumberDiv}>
                        <p className={styles.pageNumber}>
                            {this.state.prePageCounter}
                        </p>
                    </div>

                    <div className={styles.nextButtonDiv}>
                        <Button
                            bsStyle="primary"
                            onClick={this.getNextVideos}>
                            Next
                        </Button>
                    </div>

                </div>
            </div>
        )

    }
}

export default withRouter(Home)