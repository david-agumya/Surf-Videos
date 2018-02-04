import React, {Component} from 'react';
import Home from "./Home.jsx";
import Detail from './Detail.jsx'
import {
    BrowserRouter
} from 'react-router-dom'



class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <Route component={Home} path="/"/>
                <Route component={Detail} path="/details"/>
            </BrowserRouter>
        )
    }
}

export default App;