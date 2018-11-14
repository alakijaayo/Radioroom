import React from 'react';
import SearchTrack from './SearchTrack.js';
//import './css/SearchTracks.css';

export default class SearchTracks extends React.Component {
  constructor(props) {
    super(props);

    //this.api = props.api;
  }
  render() {
    const { tracks } = this.props;
    return (
      <div className="tracks">
        {tracks.map(track => (
          <SearchTrack
            key={track.id}
            track={track}
            addToPlaylist={this.props.addToPlaylist}
          />
        ))}
      </div>
    );
  }
}
