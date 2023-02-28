import React, { Component } from "react";

class Event extends Component {
  state = { collapsed: true };

  toggleEventDetails = () => {
    this.setState((prevState) => ({
      collapsed: !prevState.collapsed,
  }));
}

  render() {
    const { event } = this.props;
    return (
      <div className="event">
        <h1 className="event-summary-title">{event.summary}</h1>
        <button className="event-details-btn" onClick={this.toggleEventDetails}>
          {this.state.show ? "Hide Details" : "Show Details"}
        </button>
        {this.state.show && (
          <div>
            <p className="event-info">
              {event.summary} {event.location} {event.dateTime}
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default Event;

    