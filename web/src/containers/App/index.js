// @flow
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from '../../components/NotFound';
import Home from '../Home';
import Login from '../Login';
import Signup from '../Signup';
import Room from '../Room';
import { connect } from 'react-redux';
import { authenticate, unauthenticate, logout } from '../../actions/session';
import Sidebar from '../../components/Sidebar';


type Props = {
  authenticate: () => void,
  unauthenticate: () => void,
  isAuthenticated: boolean,
  willAuthenticate: boolean,
  logout: () => void,
  currentUserRooms: Array,
}

class App extends Component {

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.props.authenticate();
    } else {
      this.props.unauthenticate();
    }
  }

  handleLogout = router => this.props.logout(router);

  render() {
    const { isAuthenticated, currentUserRooms } = this.props;
    console.log("MEEEE " + isAuthenticated);
     return (
      <Router>
          <div style={{ display: 'flex', flex: '1', width: '100%'}}>
          {isAuthenticated && <Sidebar
                        rooms={currentUserRooms}
                        onLogoutClick={this.handleLogout}
                      />}
           <Route exact path="/" component={isAuthenticated? Home : Login} />
           <Route exact path="/signup" component={Signup} />
           <Route exact path="/login" component={Login} />
           <Route path="/r/:id" component={isAuthenticated? Room : Login} />
           <Switch component={NotFound} />
           </div>
       </Router>
     );
   }
 }

 export default connect(
   state => ({
     isAuthenticated: state.session.isAuthenticated,
     willAuthenticate: state.session.willAuthenticate,
     currentUserRooms: state.rooms.currentUserRooms,
   }),
   { authenticate, unauthenticate, logout }
 )(App);
