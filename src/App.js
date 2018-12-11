import React, { Component } from "react";
import "./App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import GalleryLayout from "./GalleryLayout";
import Login from "./Login";
import { auth } from "./firebase";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
    this.setUser = this.setUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Router>
          {this.props.user ? (
            <React.Fragment>
              <Route exact path="/" component={GalleryLayout} />
              <Route
                exact
                path="/:designer/:client"
                component={GalleryLayout}
              />
            </React.Fragment>
          ) : (
            <Login setUser={this.setUser} />
          )}
        </Router>
      </MuiThemeProvider>
    );
  }

  setUser(user) {
    this.props.dispatch({ type: "USER_AUTH_LOADED" });
    this.props.dispatch({ type: "USER_SIGN_IN", user: user });
  }

  logoutUser() {
    auth.signOut().then(() => {
      this.setState({
        user: null
      });
    });
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    user_loaded: state.user_loaded
  };
};

export default connect(mapStateToProps)(App);
