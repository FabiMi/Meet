import React, { Component } from "react";

class Event extends Component {
  toggleEventDetails = () => {
    this.setState({ show: !this.state.show });
  };

  state = { show: false };

  render() {
    const { event } = this.props;
    return (
        <div className="event">
          <h1 className="event-summary-title">{event.summary}</h1>
          </div>
         
         );
        }
      }



export default Event;

    
