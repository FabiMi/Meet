import React, { Component } from "react"
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import "./nprogress.css";
class App extends Component {
  state = {
    events: [],
    locations: [],
    numOfEvents: 32,
    mockEvents: []
  }

  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      let locationEvents = events;
      // filter event list by location
      if (location !== undefined) {
        if (location !== "all") {
          locationEvents = events.filter((event) => event.location === location);
        }
      }

      this.setState({
        // Shorten event list
        events: locationEvents.slice(0, eventCount),
        numOfEvents: eventCount,
      });
    });
  };

  updateNumberOfEvents = (value) => {
    this.setState({
      numOfEvents: value
    });
  };

  componentDidMount() {
    this.mounted = true;
    getEvents()
    .then((events) => {
    if (this.mounted) {
      this.setState({
        events: events.slice(0, this.state.numOfEvents),
        locations: extractLocations(events),
      });
    }
  })
  .catch((error) => {
    console.error(error);
  });
  }


  componentWillUnmount(){
    this.mounted = false;
  }

  render() {
    return (
      <div className="App">
        <div className="filters">
          <CitySearch
            locations={this.state.locations}
            updateEvents={this.updateEvents}
          />
          <NumberOfEvents
            numOfEvents={this.state.numOfEvents}
            updateEvents={this.updateEvents}

          />
        </div>
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;