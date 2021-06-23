import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './pages/Login/'
import PartyRoom from './pages/PartyRoom'
 
import PrivateRoute from './PrivateRoute';

import './Normalize.css';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/:roomId" component={PartyRoom} />
      </Switch>
    </Router>
  );
}

export default App;
