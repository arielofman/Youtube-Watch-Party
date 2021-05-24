import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './components/Home/'
import PartyRoom from './components/PartyRoom'
 
import PrivateRoute from './PrivateRoute';

import './Normalize.css';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/:roomId" component={PartyRoom} />
      </Switch>
    </Router>
  );
}

export default App;
