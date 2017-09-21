import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import GalleryLayout from './GalleryLayout';
import Login from './Login';
import { auth } from './firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    }
    this.setUser = this.setUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        {
          this.state.user ? 
            <GalleryLayout user={this.state.user} logoutCallback={this.logoutUser} />
          :
            <Login setUser={this.setUser} />
        }
      </MuiThemeProvider>
    );
  }

  setUser(user) {
    this.setState({ user: user });
  }

  logoutUser() {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
  }
}


export default App;
