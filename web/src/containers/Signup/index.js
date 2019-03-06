// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup } from '../../actions/session';
import SignupForm from '../../components/SignupForm';
import Navbar from '../../components/Navbar';
import { withRouter } from 'react-router'

type Props = {
  signup: () => void,
}

class Signup extends Component {

  handleSignup = data => {
    this.props.signup(data, this.props.history);
  }

  render() {
    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        <SignupForm onSubmit={this.handleSignup} />
      </div>
    );
  }
}

export default withRouter(connect(null, { signup })(Signup));
