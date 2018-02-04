import React, {Component} from 'react';
import Home from "./Home.jsx";
import Detail from './Detail.jsx'
import {
    BrowserRouter,
    Switch,
    Route,
} from 'react-router-dom'



class App extends Component {

    render() {
        return (
            <BrowserRouter>
            <Switch>
                <Route component={Home} exact path="/"/>
                <Route component={Detail} exact path="/detail/:videoId" />
            </Switch>
            </BrowserRouter>
        )
    }
}

export default App;
