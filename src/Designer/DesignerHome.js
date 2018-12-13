import React from "react";
import Paper from "material-ui/Card";
import { Col } from "react-bootstrap";
import firebase from "../firebase";
import CustomerList from "./CustomerList";
import DesignerImage from "./DesignerImage";

class DesignerHome extends React.Component {
  state = { clients: {} };
  render() {
    return (
      <Col xs={12} md={6} mdOffset={3}>
        <Paper style={{ padding: "10px", margin: "10px" }}>
          <h4>Welcome! please select a customer</h4>
          <CustomerList
            designer={this.props.match.params.designer}
            clients={this.state.clients}
          />
          <br />
          <br />
          <h4>View/Edit Your Logo</h4>
          <DesignerImage designer={this.props.match.params.designer} />
        </Paper>
      </Col>
    );
  }

  componentDidMount() {
    var clientsRef = firebase
      .database()
      .ref("/designers/" + this.props.match.params.designer + "/clients");

    return clientsRef.on("value", snapshot =>
      this.setState({ clients: snapshot.val() || {} })
    );
  }
}

export default DesignerHome;
