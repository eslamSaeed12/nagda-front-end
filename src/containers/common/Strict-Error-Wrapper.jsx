import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";

class StrictErrorWrapper extends Component {
  state = {
    err: false,
  };
  componentDidCatch(err, errInfo) {
    if (process.env.NODE_ENV === "development") {
      console.log(err);
      console.error(errInfo);
    }

    this.setState({ err: true });
  }
  render() {
    if (this.state.err) {
      return <Redirect to="/internal-server-down" />;
    }
    return <Fragment>{this.props.children}</Fragment>;
  }
}

export default StrictErrorWrapper;
