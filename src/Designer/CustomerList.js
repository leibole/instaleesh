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
            !this.props.clients[clientKey].disabled && (
              <Link
                key={clientKey}
                to={"/" + this.props.designer + "/" + clientKey}
              >
                <Paper style={{ padding: "10px", margin: "10px" }}>
                  <h4 style={{ display: "inline" }}>
                    {this.props.clients[clientKey].name}
                  </h4>
                  <span style={{ float: "right" }}>
                    <Delete
                      onClick={this.removeCustomer.bind(this, clientKey)}
                    />
                  </span>
                </Paper>
              </Link>
            )
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
    var keyForName = name.replace(/ /g, "_").toLowerCase();
    var currentNames = Object.keys(this.props.clients);
    if (currentNames.indexOf(keyForName) < 0) {
      var boardsRef = firebase
        .database()
        .ref(baseCustomersRef(this.props.designer, keyForName));

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
      if (this.props.clients[keyForName].disabled) {
        var boardsRef = firebase
          .database()
          .ref(baseCustomersRef(this.props.designer, keyForName) + "/disabled");
        boardsRef.set(false).then(
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
    }
  };

  removeCustomer = (keyForName, e) => {
    e.preventDefault();
    e.stopPropagation();

    var boardsRef = firebase
      .database()
      .ref(baseCustomersRef(this.props.designer, keyForName) + "/disabled");

    boardsRef.set(true);
  };
}

export default CustomerList;

const baseCustomersRef = (designer, clientKey) => {
  return "/designers/" + designer + "/clients/" + clientKey;
};
const defaultBoards = {
  livingroom: { label: "Living Room" },
  Bathroom: { label: "Bathroom" },
  Kitchen: { label: "Kitchen" },
  "3Dplans": { label: "Childen's Room" },
  Inspiration: { label: "Inspiration" },
  Bathroom: { label: "Bathroom" }
};
