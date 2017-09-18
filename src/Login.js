import React, { Component } from 'react';
import { auth, provider } from './firebase.js';
import TopBar from './TopBar';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import Paper from 'material-ui/Paper';
import { Col } from 'react-bootstrap';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      singleView: false
    };
    this.login = this.login.bind(this);
  }

  render() {
    return (
      <div>
        <TopBar />
        <button onClick={this.login}>Log in</button>
        <List style={{ marginTop: '60px' }}>
          <Subheader>Sign in with one of these</Subheader>
          <Col md={6} mdOffset={3}>
            <Paper style={{ margin: '10px' }}>
              <ListItem
                primaryText="Sign in with Google"
                leftAvatar={<Avatar src="images/google_logo.jpg" />}
                rightIcon={<CommunicationChatBubble />}
                onClick={this.login}
              />
            </Paper>
          </Col>
        </List>
      </div>
    )
  }

  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.props.setUser(user);
      });

  }
}

export default Login;