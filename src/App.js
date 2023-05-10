import React, { Component } from "react"
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents'
import EventGenre from "./EventGenre";
import "./nprogress.css";
import {OfflineAlert} from './Alert';
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from
'./api';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
 


class App extends Component {
  state = {
    events: [],
    locations: [],
    numOfEvents: 32,
    mockEvents: [],
    showWelcomeScreen: undefined,
    offlineText: ""
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
      this.promptOfflineWarning();
    });
  };

  updateNumberOfEvents = (value) => {
    this.setState({
      numOfEvents: value
    });
  };

 
  
  promptOfflineWarning = () => {
    if (!navigator.onLine) {
      this.setState({
        offlineText: 'You are offline, so events may not be up to date'
      })
    } else {
      this.setState({
        offlineText: ''
      })
    }
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return {city, number};
    })
    return data;
  };

  

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem("access_token");
    const isTokenValid =
      !window.location.href.startsWith("http://localhost") &&
        !(accessToken && !navigator.onLine) &&
        (await checkToken(accessToken)).error
        ? false
        : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    const byPassWelcomeScreen = code || isTokenValid;

    this.setState({ showWelcomeScreen: !byPassWelcomeScreen });

    if (byPassWelcomeScreen) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events: events.slice(0, 32),
            locations: extractLocations(events),
          });
        }
      });
    }
  }


  render() {
    if (this.state.showWelcomeScreen === undefined) {
      return <div className="App" />
    } else if (this.state.showWelcomeScreen === true) {
      return <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
        getAccessToken={() => { getAccessToken() }} />
    } else {
      return (
        <div className="App">
          <OfflineAlert text={this.state.offlineText} />
          <h1>Meet App</h1>
          <h2>Search for your nearest city </h2>
          <div className="filters">
            <CitySearch
              locations={this.state.locations}
              updateEvents={this.updateEvents}
            />

            <h3>Number of events:</h3>
            <NumberOfEvents
              numOfEvents={this.state.numOfEvents}
              updateEvents={this.updateEvents}
            />
          </div>

        <h4>Events in each City</h4>:
  
        <div className="data-vis-wrapper">
          <EventGenre events={this.state.events} />
        <ResponsiveContainer height={400} >
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis type="category" dataKey="city" name="city" />
            <YAxis
              allowDecimals={false}
              type="number"
              dataKey="number"
              name="number of events"
            />

            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={this.getData()} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

        <EventList events={this.state.events} />

       
      </div>
    );
  }

}}

export default App;