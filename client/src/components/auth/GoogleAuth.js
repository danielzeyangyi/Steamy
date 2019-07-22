import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../../actions';

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load('client: auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '659480107063-4754brprimc67dvr3r465v1pgoa3m7q0.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          // invoke after initialize
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    isSignedIn
      ? this.props.signIn(this.auth.currentUser.get().getId())
      : this.props.signOut();
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    return this.props.isSignedIn === null ? null : this.props.isSignedIn ? (
      <button onClick={this.onSignOutClick} className='ui red google button'>
        <i className='google icon' />
        Sign out
      </button>
    ) : (
      <button onClick={this.onSignInClick} className='ui green google button'>
        <i className='google icon' />
        Sign in
      </button>
    );
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  {
    signIn,
    signOut
  }
)(GoogleAuth);
