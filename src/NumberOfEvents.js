import React, { Component } from 'react';
import { ErrorAlert } from './Alert';
 

export class NumberOfEvents extends Component {

  state = { numOfEvents: 32 };


  handleInputChanged = (event) => {
    const value = event.target.value;
    if(value < 0 || value > 32) {
      this.setState({
       errorText: 'Please select number from 1 to 32'
      }) 

    } else {
    this.props.updateEvents(undefined, value);
    this.setState({ numOfEvents: value, errorText: '' });
  };
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