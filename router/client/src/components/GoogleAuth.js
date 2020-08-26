import React from "react";

class GoogleAuth extends React.Component {
  // default state
  state = { isSignedIn: null };

  componentDidMount() {
    // gapi belongs to the window scope
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "1098059258708-tg1onvnu283vbva738127t1lh2kojds9.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          // now we know the user is signed in (after Promise is returned)
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          // listen for auth change (sign in and sign out)
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return <div class="ui active mini inline loader"></div>;
    } else if (this.state.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon"></i>
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui green google button">
          <i className="google icon"></i>
          Sign In
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth;
