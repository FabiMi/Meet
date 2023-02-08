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
      updateEvents = (location, numOfEvents) => {
        getEvents().then((events) => {
          const locationEvents =
            location === "all"
              ? events
              : events.filter((event) => event.location === location);
          this.setState({
            events: locationEvents.slice(0, numOfEvents || this.state.numOfEvents),
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
              num={this.state.numOfEvents}
              updateNumberOfEvents={(num) => this.updateNumberOfEvents(num)}
              updateEvents={this.updateEvents}

            />
          </div>
          <EventList events={this.state.events} />
        </div>
      );
    }
  }
  


export default App;