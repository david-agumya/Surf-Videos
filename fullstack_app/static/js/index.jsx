// index.jsx
import React from "react";
import ReactDOM from "react-dom";
import Detail from './Detail.jsx';
import Home from './Home.jsx'
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/detail/:videoId" component={Detail}/>
        </Switch>
    </BrowserRouter>, document.getElementById("content"));

