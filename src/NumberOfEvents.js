import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    errorText: "",
    numOfEvents: this.props.numOfEvents,
  };



  /**
   * @description handleInputChanged function handles the input change event. It will update the numOfEvents state and errorText state. It will also call the updateEvents function to update the events list.
   * @param {*} event 
   * @returns  {string} value
   * @returns {string} errorText
   */
  handleInputChanged = (event) => {
    let numOfEvents = event.target.value;
    const errorText =
      numOfEvents < 0 || numOfEvents > 32 || !numOfEvents
        ? "Select a number from 1 to 32"
        : "";
    this.setState({
      errorText,
      numOfEvents,
    });
    if (!errorText) {
      this.props.updateEvents(undefined, numOfEvents);
    }
  };

  render() {
    return (
      <div className="number-of-events">
        <ErrorAlert id="errorAlert" text={this.state.errorText} />
        <label>
          <input
            type="number"
            className="number-input"
            min={0}
            value={this.state.numOfEvents || 32}
            onChange={this.handleInputChanged}
          />
        </label>
      </div>
    );
  }
}

export default NumberOfEvents;