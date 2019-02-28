// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/session';
import LoginForm from '../../components/LoginForm';
import Navbar from '../../components/Navbar';

type Props = {
  login: () => void,
}

class Login extends Component {

  props: Props

  componentDidMount = () => {

  }

  handleLogin = (data) => this.props.login(data, this.props.history);

  render() {
    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        <LoginForm onSubmit={this.handleLogin} />
      </div>
    );
  }
}



export default connect(null, { login })(Login);
