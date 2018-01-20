import React, {Component} from 'react';
import './App.css'
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom'

// COMPONENT IMPORTS
import Home from './components/Home'
import PageDetail from './components/Detail.js'




class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                   <Route exact path="/" component={Home} />
                   <Route path="/videoDetail/:videoId" component={PageDetail} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;

