/**
 * Signin Firebase
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Link} from 'react-router-dom';
import {Form, FormGroup, Input} from 'reactstrap';
import LinearProgress from '@material-ui/core/LinearProgress';
import QueueAnim from 'rc-queue-anim';

// components
import {SessionSlider} from 'Components/Widgets';

import {NotificationManager} from 'react-notifications';

// app config
import AppConfig from 'Constants/AppConfig';

// redux action
import {
  signinUserInMySQL,
  signinUserWithFacebook,
  signinUserWithGoogle,
} from 'Actions';

//Auth File
import Auth from '../Auth/Auth';
import {Fab} from '@material-ui/core';

class Signin extends Component {
  state = {
    email: '',
    password: '',
  };

  /**
	 * On User Login
	 */
  onUserLogin () {
    const {email, password} = this.state;
    if (this.state.email !== '' && this.state.password !== '') {
      this.props.signinUserInMySQL ({email, password}, this.props.history);
    } else {
      NotificationManager.error ('You must to fill all the data required');
    }
  }

  /**
	 * On User Sign Up
	 */
  onUserSignUp () {
    this.props.history.push ('/signup');
  }

  /**
	 * On Forgot password
	 */
  onForgotPassword () {
    this.props.history.push ('/session/forgot-password');
  }

  render () {
    const {email, password} = this.state;
    const {loading} = this.props;
    return (
      <QueueAnim type="bottom" duration={2000}>
        <div className="rct-session-wrapper">
          {loading && <LinearProgress />}
          <AppBar position="static" className="session-header">
            <Toolbar>
              <div className="container">
                <div className="d-flex justify-content-between">
                  <div className="session-logo">
                    <Link to="/">
                      <img
                        src={AppConfig.appLogo}
                        alt="session-logo"
                        className="img-fluid"
                        width="110"
                        height="35"
                      />
                    </Link>
                  </div>
                  <div>
                    <a className="mr-15" onClick={() => this.onUserSignUp ()}>
                      Create New account?
                    </a>
                    <Button
                      variant="contained"
                      className="btn-light"
                      onClick={() => this.onUserSignUp ()}
                    >
                      Sign Up
                    </Button>
                  </div>
                </div>
              </div>
            </Toolbar>
          </AppBar>
          <div className="session-inner-wrapper">
            <div className="container">
              <div className="row row-eq-height">
                <div className="col-sm-7 col-md-7 col-lg-8">
                  <div className="session-body text-center">
                    <div className="session-head mb-30">
                      <h2 className="font-weight-bold">
                        Get started with {AppConfig.brandName}
                      </h2>
                      <p className="mb-0">Most powerful ReactJS admin panel</p>
                    </div>
                    <Form>
                      <FormGroup className="has-wrapper">
                        <Input
                          type="email"
                          value={email}
                          name="user-mail"
                          id="user-mail"
                          className="has-input input-lg"
                          placeholder="Enter Email Address"
                          onChange={event =>
                            this.setState ({email: event.target.value})}
                        />
                        <span className="has-icon">
                          <i className="ti-email" />
                        </span>
                      </FormGroup>
                      <FormGroup className="has-wrapper">
                        <Input
                          value={password}
                          type="Password"
                          name="user-pwd"
                          id="pwd"
                          className="has-input input-lg"
                          placeholder="Password"
                          onChange={event =>
                            this.setState ({password: event.target.value})}
                        />
                        <span className="has-icon">
                          <i className="ti-lock" />
                        </span>
                      </FormGroup>
                      
                        <a
                          className="mr-10"
                          onClick={() => this.onForgotPassword()}
                        >
                          Forgot your password?
                        </a>
                     
                      <FormGroup className="mb-15">
                        <Button
                          color="primary"
                          className="btn-block text-white w-100"
                          variant="contained"
                          size="large"
                          onClick={() => this.onUserLogin ()}
                        >
                          Sign In
                        </Button>
                      </FormGroup>
                      <FormGroup className="mb-15" />
                    </Form>
                    <p className="mb-20">or sign in with</p>
                    <Fab
                      variant="round"
                      size="small"
                      className="btn-facebook mr-15 mb-20 text-white"
                      onClick={() =>
                        this.props.signinUserWithFacebook (this.props.history)}
                    >
                      <i className="zmdi zmdi-facebook" />
                    </Fab>
                    <Fab
                      variant="round"
                      size="small"
                      className="btn-google mr-15 mb-20 text-white"
                      onClick={() =>
                        this.props.signinUserWithGoogle (this.props.history)}
                    >
                      <i className="zmdi zmdi-google" />
                    </Fab>
                    <p className="text-muted">
                      By signing up you agree to {AppConfig.brandName}
                    </p>
                    <p className="mb-0">
                      <a
                        target="_blank"
                        href="#/terms-condition"
                        className="text-muted"
                      >
                        Terms of Service
                      </a>
                    </p>
                  </div>
                </div>
                <div className="col-sm-5 col-md-5 col-lg-4">
                  <SessionSlider />
                </div>
              </div>
            </div>
          </div>
        </div>
      </QueueAnim>
    );
  }
}

// map state to props
const mapStateToProps = ({authUser}) => {
  const {user, loading} = authUser;
  return {user, loading};
};

export default connect (mapStateToProps, {
  signinUserInMySQL,
  signinUserWithFacebook,
  signinUserWithGoogle,
}) (Signin);
