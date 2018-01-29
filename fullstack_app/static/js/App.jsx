import React from "react";
import {
    PageHeader,
    Grid,
    Row,
    Col
} from 'react-bootstrap'

import SearchForm from './SearchForm.jsx'
import axios from 'axios'
import ThumbNails from './ThumbNails.jsx'


export default class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            vidInfo : []
        }
    }

    componentDidMount(){
        axios.get('/getVideos')
            .then(responseData => {
                this.setState({
                    vidInfo : responseData.data
                })
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

        return (
            <div style={containerStyle}>
                <div style={headerStyle}>
                    <PageHeader style={headingStyle}>
                        Surf's App
                        <small style={subHeadingTextStyle}> A youtube surf video utility.</small>
                    </PageHeader>
                    <div className="search-form">
                        {/*Add search form here*/}
                        <SearchForm/>
                    </div>
                    <hr/>
                </div>

                <div className="video-thumbnails">
                    <ThumbNails videoDetails={this.state.vidInfo}/>

                </div>
            </div>
        )

    }
}
