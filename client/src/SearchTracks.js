import React from 'react';
import SearchTrack from './SearchTrack.js';
//import './css/SearchTracks.css';

export default class SearchTracks extends React.Component {
  render() {
    const { tracks } = this.props;
    return (
      <div className="tracks">
        {tracks.map(track => (
          <SearchTrack
            key={track.id || 'unique_dummy_id'}
            track={track}
            addToPlaylist={this.props.addToPlaylist}
          />
        ))}
      </div>
    );
  }
}
