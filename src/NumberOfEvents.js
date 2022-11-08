import React, { Component } from 'react';

export class NumberOfEvents extends Component {

  state = { numOfEvents: 32 };


  handleInputChanged = (event) => {
    const value = event.target.value;
    this.props.updateEvents(undefined, value);
   
    this.setState({ numOfEvents: value });
  };

    
  

  render() {
    return (
      <div className="numberOfEvents">
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