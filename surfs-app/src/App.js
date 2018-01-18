import React, {Component} from 'react';
import axios from 'axios'
import SearchForm from './components/SearchForm'
import {
    PageHeader
} from 'react-bootstrap'
import VideoList from './components/VidList'
import './App.css'

var API_KEY = 'AIzaSyCJsPJPZZDSVADy_asq7yti4bYrNy8FLak';



class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            vidList : []
        }
    }

    componentDidMount() {
        let searchTerm = 'surfing';

        axios.get(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&q=${searchTerm}&maxResults=10`)
            .then(responseData => {
                let videosList = responseData.data.items;
                this.setState({
                    vidList : videosList
                });
            }).catch(err => {
                console.log("Error fetching and parsing data", err)
        })


    }


    render() {
        return (
            <div id="application">
                <div className="mainHeader">
                    <PageHeader>
                        <h1 className="mainTitle"> Surf's App </h1>
                        <small className="subText">Search for surfing related videos</small>
                    </PageHeader>
                    <SearchForm/>
                </div>

                <div className="main-content">
                    <VideoList videoDetails={this.state.vidList}/>
                </div>
            </div>
        )
    }
}

export default App;
