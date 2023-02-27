import React, { Component } from "react";

class Event extends Component {

  state = { show: false };

  toggleEventDetails = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    const { event } = this.props;
    return (
        <div className="event" >
          <h1 className="event-summary-title">{event.summary}</h1>
          <button className="event-details-btn" onClick={this.toggleEventDetails}>details</button>
          <div> 
             <p className="event-info"> {event.summary} {event.location} {event.dateTime} </p> 
          </div>
          </div>
         
         );
        }
      }



export default Event;

    