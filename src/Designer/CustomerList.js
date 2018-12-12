import React from "react";
import Paper from "material-ui/Card";
import Delete from "material-ui/svg-icons/action/delete";
import { Link } from "react-router-dom";
import NewCustomer from "./NewCustomer";
import firebase from "../firebase";

class CustomerList extends React.Component {
  state = { newCustomerOpen: false };
  render() {
    return (
      <React.Fragment>
        {Object.keys(this.props.clients).map(clientKey => {
          return (
            <Link
              key={clientKey}
              to={"/" + this.props.designer + "/" + clientKey}
            >
              <Paper style={{ padding: "10px", margin: "10px" }}>
                <h4 style={{ display: "inline" }}>
                  {this.props.clients[clientKey].name}
                </h4>
                <span style={{ float: "right" }}>
                  <Delete />
                </span>
              </Paper>
            </Link>
          );
        })}
        <Paper
          style={{ padding: "10px", margin: "10px", cursor: "pointer" }}
          onClick={this.openNewCustomer}
        >
          <h4 style={{ display: "inline" }}>Add New Customer</h4>
        </Paper>
        <NewCustomer
          open={this.state.newCustomerOpen}
          closeNewCustomer={this.closeNewCustomer}
          addNewCustomer={this.addNewCustomer}
        />
      </React.Fragment>
    );
  }

  openNewCustomer = () => {
    this.setState({ newCustomerOpen: true });
  };

  closeNewCustomer = () => {
    this.setState({ newCustomerOpen: false });
  };

  addNewCustomer = name => {
    if (!name) return;
    var keyForName = name.replace(/ /g, "_");
    var currentNames = Object.keys(this.props.clients);
    if (currentNames.indexOf(keyForName) < 0) {
      var boardsRef = firebase
        .database()
        .ref("/designers/" + this.props.designer + "/clients/" + keyForName);

      boardsRef.set({ name: name, boards: defaultBoards }).then(
        () => {
          this.closeNewCustomer();
        },
        error => {
          console.log("error adding customer");
          console.error(error);
        }
      );
    } else {
      this.closeNewCustomer();
    }
  };
}

export default CustomerList;

const defaultBoards = {
  livingroom: { label: "Living Room" },
  Bathroom: { label: "Bathroom" },
  Kitchen: { label: "Kitchen" },
  "3Dplans": { label: "Childen's Room" },
  Inspiration: { label: "Inspiration" },
  Bathroom: { label: "Bathroom" }
};