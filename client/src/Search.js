import React, { Component } from 'react';
import SearchTracks from './SearchTracks.js';

class Search extends Component {
  constructor(props) {
    super();
    this.spotifyApi = props.spotifyApi;
    this.state = { value: '', tracks: [{}] };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.spotifyApi.search(this.state.value, ['track']).then(response => {
      this.setState({ value: '', tracks: response.tracks.items });
    });
  }

  removeTrack(uri) {
    let filteredTracks = this.state.tracks.filter(track => track.uri !== uri);
    this.setState({ tracks: filteredTracks });
  }

  render() {
    return (
      <div className="search">
        <h2>Search</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" />
        </form>
        <SearchTracks
          tracks={this.state.tracks}
          addToPlaylist={this.props.addToPlaylist}
          removeTrack={this.removeTrack}
        />
      </div>
    );
  }
}

export default Search;
