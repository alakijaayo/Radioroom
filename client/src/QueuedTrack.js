import React from 'react';

export default class QueuedTrack extends React.Component {
  constructor(props) {
    super(props);
    this.track = props.track;
    this.onVote = this.onVote.bind(this);
  }
  onVote(uri, vote) {
    this.props.vote(uri, vote);
  }
  render() {
    return (
      <div className="queued-track">
        {this.track.artwork ? (
          <img
            src={this.track.artwork}
            alt="album cover art"
            style={{ height: 150 }}
          />
        ) : (
          ''
        )}
        {this.track.artist ? <div className="">{this.track.artist}</div> : ''}
        {this.track.track ? <div className="">{this.track.track}</div> : ''}
        {this.track.uri ? (
          <button onClick={this.onVote.bind(this, this.track.uri, 1)}>
            Vote Up
          </button>
        ) : (
          ''
        )}
        {this.track.uri ? (
          <button onClick={this.onVote.bind(this, this.track.uri, -1)}>
            Vote Down
          </button>
        ) : (
          ''
        )}
      </div>
    );
  }
}
