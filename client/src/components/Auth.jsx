import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { authUser, logout } from '../store/actions';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state;
    const { authType } = this.props;

    this.props.authUser(authType || 'login', { username, password });
  }

  render() {
    const { username, password } = this.state;

    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">username</label>
          <input
            id="username"
            type="text"
            value={username}
            name="username"
            onChange={this.handleChange}
          ></input>
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            value={password}
            name="password"
            onChange={this.handleChange}
          ></input>
          <button type="submit">Submit</button>
        </form>
      </Fragment>
    );
  }
}

export default connect(() => ({}), { authUser, logout })(Auth);
