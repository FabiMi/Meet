import React, { Component } from "react"
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents'
import "./nprogress.css";
import {OfflineAlert} from './Alert';
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from
'./api';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';


class App extends Component {
  state = {
    events: [],
    locations: [],
    numOfEvents: 32,
    mockEvents: [],
    showWelcomeScreen: undefined
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

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false :
  true;
    const searchParams = new URLSearchParams(window.location.search);
   
  const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
  }); }
  }
  
  promptOfflineWarning = () => {
    if (!navigator.onLine) {
      this.setState({
        offlineText: 'You are offline, so events may not be up to date'
      })
    }
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div
className="App" />

    return (
      <div className="App">
        <OfflineAlert text={this.state.offlineText} />
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

        
       {/*  <h4>Events in each city</h4>

         <ScatterChart
          width={400}
          height={400}
          margin={{
            top: 20, right: 20, bottom: 20, left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="stature" unit="cm" />
          <YAxis type="number" dataKey="y" name="weight" unit="kg" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="A school" data={data} fill="#8884d8" />
        </ScatterChart>
*/}


        <EventList events={this.state.events} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }

}

export default App;