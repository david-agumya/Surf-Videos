import React, {Component} from 'react';
import axios from 'axios'
import Header from './Header'
import VideoList from './VidList'
import '../App.css'
import {
    Button
} from 'react-bootstrap'

const API_KEY = 'AIzaSyCJsPJPZZDSVADy_asq7yti4bYrNy8FLak';



class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            vidList : [],
            searchTerm : 'surfing',
            nextPageToken : '',
            previousToken : '',
        };
    }

    componentDidMount() {
        this.executeRequest(this.state.searchTerm);
    }

    executeRequest = (search) => {
        this.setState({searchTerm : search});
        axios.get(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&type=video&part=snippet&q=${this.state.searchTerm}&maxResults=15`)
            .then(responseData => {
                let videosList = responseData.data.items;
                let nextPgToken = responseData.data.nextPageToken;
                let prevPageToken = responseData.data.prevPageToken;
                this.setState({
                    vidList: videosList,
                    nextPageToken: nextPgToken,
                    previousToken: prevPageToken,
                })
            }).catch(err => {
            console.log("Error fetching and parsing data", err)
        });
    };

    executeNextRequest = (pageToken) => {
        axios.get(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&type=video&part=snippet&q=${this.state.searchTerm}&maxResults=15&pageToken=${pageToken}`)
            .then(responseData => {
                let videosList = responseData.data.items;
                let nextPgToken = responseData.data.nextPageToken;
                let prevPageToken = responseData.data.prevPageToken;
                this.setState({
                    vidList: videosList,
                    nextPageToken: nextPgToken,
                    previousToken: prevPageToken,

                });

            }).catch(err => {
            console.log("Error fetching and parsing data", err)
        });
    };

    search =  (searchTerm) => {
        let searchText = `surfing+${searchTerm}`;
        this.executeRequest(searchText)

    };

    renderPrevious = () => {
        this.executeNextRequest(this.state.previousToken)
    };

    renderNext = () => {
        this.executeNextRequest(this.state.nextPageToken)
    };



    render() {
        return (
                <div id="application">
                    <div className="mainHeader">
                        <Header search={this.search} />
                    </div>
                    <div className="main-content">
                        <VideoList videoDetails={this.state.vidList}/>
                    </div>
                    <div>{this.state.previousToken !== '' &&
                        <Button bsStyle="primary"
                                className="prev-button"
                                onClick={this.renderPrevious}> {"<<"} Previous Page</Button>
                        }
                        <Button bsStyle="primary"
                                className="next-button"
                                onClick={this.renderNext} >Next Page {">>"}</Button>
                    </div>
                </div>
        )
    }
}

export default Home;
