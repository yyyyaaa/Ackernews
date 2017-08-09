import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import '../style/App.css';
import Header from './Header';
import LinkListPage from './LinkListPage';
import CreateLink from './CreateLink';
import Login from './Login';

class App extends Component {
  render() {
    return (
      <div className="center w85">
        <Header />
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path="/" component={LinkListPage}/>
            <Route exact path="/create" component={CreateLink}/>
            <Route exact path="/login" component={Login}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
