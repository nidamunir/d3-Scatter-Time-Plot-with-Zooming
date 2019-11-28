import React, { Component } from "react";

export default class Toggle extends Component {
  state = {
    on: false
  };

  toggle = () => {
    this.setState({
      on: !this.state.on
    });
  };
  render() {
    return <div>{this.props.children(this.state.on, this.toggle)}</div>;
  }
}
