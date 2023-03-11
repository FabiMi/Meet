import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

export class NumberOfEvents extends Component {

  state = { numOfEvents: 32, errorText: '' };

  handleInputChanged = (event) => {
    const value = event.target.value;
    if (value < 1 || value > 32) {
      this.setState({ errorText: 'Please enter a number between 1 and 32' });
    } else {
      this.setState({ errorText: '', numOfEvents: value });
      this.props.updateEvents(undefined, value);
    }
  }

  render() {
    return (
      <div className="number-of-events">
        <ErrorAlert text={this.state.errorText} />
        <label>
          Number of Events:
          <input
            type="number"
            className="number-input"
            value={this.state.numOfEvents}
            onChange={this.handleInputChanged}
          />
        </label>
      </div>
    );
  }
}

export default NumberOfEvents;
