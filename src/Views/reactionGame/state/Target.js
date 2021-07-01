import React from "react";
import { makeTargetStyle } from "../js/styles.js";
import { defaultParams } from "../js/params";

class Target extends React.Component {
  tooLate = setTimeout(() => {
    this.setState({ fired: true });
    this.props.targetFired();
  }, defaultParams.periodForClickMsec);

  clearTimeout = () => {
    clearTimeout(this.tooLate);
    return true;
  };

  constructor(props) {
    super(props);
    this.state = { fired: false };
  }

  render() {
    return (
      <div
        onClick={() => {
          !this.state.fired &&
            this.clearTimeout() &&
            this.props.clickHandler(this.props.id);
        }}
        style={makeTargetStyle({
          ...this.props.coordinate,
          fired: this.state.fired,
        })}
      />
    );
  }
}

export default Target;
