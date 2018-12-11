import React from "react";

class TestRouter extends React.Component {
  render() {
    return (
      <div>
        {this.props.match.params.client} -- {this.props.match.params.designer}
      </div>
    );
  }
}

export default TestRouter;
