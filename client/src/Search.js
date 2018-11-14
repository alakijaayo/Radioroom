import React, { Component } from 'react';
import SearchTracks from './SearchTracks.js';
import './App.css';

class Search extends Component {
  constructor(props) {
    super();
    this.spotifyApi = props.spotifyApi;
    this.state = { value: '', tracks: [{}] };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    // event.preventDefault();
    // const peepText = this.state.value;
    // const peep = await this.api.createPeep(peepText);
    // this.props.onNewPeep(peep);
    // this.setState({ value: ‘’ });
    this.spotifyApi.search(this.state.value, ['track']).then(response => {
      console.log(response);
      console.log(response.tracks.items);
      this.setState({ tracks: response.tracks.items });
    });
  }

  render() {
    return (
      <div className="search">
        <form onSubmit={this.handleSubmit}>
          <label>
            Search Track:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <SearchTracks tracks={this.state.tracks} />
      </div>
    );
  }
}

export default Search;
