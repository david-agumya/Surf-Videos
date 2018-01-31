import React from "react";
import {
    PageHeader,
    Grid,
    Row,
    Col,
    Button
} from 'react-bootstrap'

import SearchForm from './SearchForm.jsx'
import axios from 'axios'
import ThumbNails from './ThumbNails.jsx'

/*
 Main component responsible for rendering the home page of surfing videos
 */
export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.getNextVideos = this.getNextVideos.bind(this);
        this.getPreviousVideos = this.getPreviousVideos.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
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
        axios.get('/getVideos')
            .then(responseData => {
                this.setState({
                    vidInfo: responseData.data
                })
            }).catch(err => {
            console.log("/getVideos : ", err);
            alert('OOps : Unable to get videos from youtube')
        })
    }

    /*
     Event handler for when the user wants to the next page of videos
     Makes a call to backend route and changes list of videos in state
     */
    getNextVideos() {
        axios.get('/getMoreVideos')
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
        axios.get('/getPreviousVideos')
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
     Event handler for when the user wants to for surf videos with a specific term
     Makes a call to backend route and changes list of videos in statenpm r
     */
    handleSearch(searchTerm) {
        let route = "search/"+searchTerm;
        console.log(route); // follow up on bug when this statement is removed search function does not work
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
    }


    render() {
        let containerStyle = {
            width: '90%',
            margin: '0 auto'
        };
        let headerStyle = {
            marginLeft: '30px',
            marginRight: '30px',
            paddingLeft: '20px',

        };
        let headingStyle = {
            textAlign: 'center',
        };
        let subHeadingTextStyle = {
            display: 'block',
            padding: '10px',

        };
        let nextButtonStyle = {
            width: '100%',
        };
        let prevButtonStyle = {
            width: '100%',
        };
        let pageNumStyle = {
            width: '100%',
            textAlign: 'center',
            display: 'inline-block',
        };
        let prevButtonDivStyle = {
            display: 'inline-block',
            float: 'left',
            boxSizing: 'border-box',
            width: '10%'
        };
        let nextButtonDivStyle = {
            display: 'inline-block',
            float: 'right',
            boxSizing: 'border-box',
            width: '10%'
        };
        let pageNumDivStyle = {
            display: 'inline-block',
            float: 'left',
            boxSizing: 'border-box',
            width: '80%'
        };

        return (
            <div style={containerStyle}>
                <div style={headerStyle}>
                    <PageHeader style={headingStyle}>
                        Surf's App
                        <small style={subHeadingTextStyle}> A youtube surf video utility.</small>
                    </PageHeader>
                    <div className="search-form">
                        {/*Add search form here*/}
                        <SearchForm  search={this.handleSearch}/>
                    </div>
                    <hr/>
                </div>

                <div className="video-thumbnails">
                    <ThumbNails videoDetails={this.state.vidInfo}/>
                </div>
                <div>
                    <div style={prevButtonDivStyle}>
                        {this.state.prePageCounter > 1 &&
                        <Button
                            bsStyle="primary"
                            style={prevButtonStyle}
                            onClick={this.getPreviousVideos}
                        >Previous
                        </Button>
                        }
                    </div>
                    <div style={pageNumDivStyle}>
                        <p
                            style={pageNumStyle}
                        >
                            {this.state.prePageCounter}
                        </p>
                    </div>
                    <div style={nextButtonDivStyle}>
                        <Button
                            bsStyle="primary"
                            style={nextButtonStyle}
                            onClick={this.getNextVideos}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        )

    }
}
