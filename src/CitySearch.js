import React, { Component } from 'react';

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: []
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ showSuggestions: true });
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    if (suggestions.length === 0) {
      this.setState({
        query: value,
        infoText:
          "We can not find the city you are looking for. Please try another city",
      });
    } else {
      return this.setState({
        query: value,
        suggestions,
        infoText: null,
      });
    }

    
  };
  render() {
    return (
      <div className="CitySearch">
        <input
          type="text"
          className="city"
          value={this.state.query}
          onChange={this.handleInputChanged}
        />
        <ul className="suggestions">
  {this.state.suggestions.map((suggestion) => (
    <li key={suggestion}>{suggestion}</li>
  ))}
  <li key='all'>
    <b>See all cities</b>
  </li>
</ul>
      </div>
    );
  }
}

export default CitySearch;