import React, {Component} from 'react';
import './App.css'
import {
    Jumbotron,
    Button
} from 'react-bootstrap'

import axios from 'axios'
import SearchForm from './components/SearchForm'




var API_KEY = 'AIzaSyCJsPJPZZDSVADy_asq7yti4bYrNy8FLak'



class App extends Component {

    componentDidMount() {
        let searchTerm = 'surfing';

        axios.get(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&q=${searchTerm}&maxResults=5`)
            .then(responseData => {
                let videosList = responseData.data.items;
                videosList.map( videoJSON => {
                    let vidDetails = {
                        url : videoJSON.snippet.thumbnails.high.url,
                        height : videoJSON.snippet.thumbnails.high.height,
                        weight : videoJSON.snippet.thumbnails.high.width,
                    };
                    console.log(vidDetails)
                })
            }).catch(err => {
                console.log("Error fetching and parsing data", err)
        })


    }


    render() {
        return (
            <div>
                <div className="main-header">
                    <Jumbotron className="jumbotron-custom">
                        <h1 className="main-title"> Surf's App </h1>
                    </Jumbotron>
                    <SearchForm/>
                </div>

                <div className="main-content">

                </div>

            </div>
        )
    }
}

export default App;
