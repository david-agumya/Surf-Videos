import React, {Component} from 'react';
import Home from "./Home.jsx";
import Detail from './Detail.jsx';
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
                    <Route exact path="/" component={Home} />
                    <Route exact path="/detail/:videoId" component={Detail}  />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;
