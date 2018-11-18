import React from 'react';
import QueuedTrack from './QueuedTrack.js';

export default class Queue extends React.Component {
  render() {
    const { tracks } = this.props;
    return (
      <div className="queued-tracks">
        <h2>Up Next</h2>
        {tracks ? (
          tracks.map(track => (
            <QueuedTrack key={track.uri || 'unique_dummy_id'} track={track} />
          ))
        ) : (
          <div>Empty...</div>
        )}
      </div>
    );
  }
}
