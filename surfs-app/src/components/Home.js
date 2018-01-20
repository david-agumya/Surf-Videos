import React, {Component} from 'react';
import axios from 'axios'
import Header from './Header'
import VideoList from './VidList'
import '../App.css'


const API_KEY = 'AIzaSyCJsPJPZZDSVADy_asq7yti4bYrNy8FLak';



class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            vidList : []
        };
    }

    componentDidMount() {
        let searchTerm = 'surfing';
        this.executeRequest(searchTerm);
    }

    executeRequest = (search) => {
        axios.get(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&type=video&part=snippet&q=${search}&maxResults=5`)
            .then(responseData => {
                let videosList = responseData.data.items;
                this.setState({
                    vidList: videosList,
                })
            }).catch(err => {
            console.log("Error fetching and parsing data", err)
        });
    };

    search =  (searchTerm) => {
        let searchText = `surfing+${searchTerm}`;
        this.executeRequest(searchText)

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
                </div>
        )
    }
}

export default Home;
