import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Login from '../components/Login';
import AllSongs from '../components/AllSongs';

class App extends Component {

    render() {
        return(
            <div>
            <Router>
              <Navigation/>

              <Route path="/login" component={Login} />
              <Route path="/all" component={AllSongs} />
                </Router>
            </div>
        )
    }
}

export default App;