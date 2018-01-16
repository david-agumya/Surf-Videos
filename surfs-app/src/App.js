import React, {Component} from 'react';
import './App.css'
import {
    Jumbotron,
    Button
} from 'react-bootstrap'

import SearchForm from './components/SearchForm'


class App extends Component {
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
