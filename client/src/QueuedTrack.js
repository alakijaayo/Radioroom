import React from 'react';

export default class QueuedTrack extends React.Component {
  constructor(props) {
    super(props);
    this.onVote = this.onVote.bind(this);
  }
  onVote(uri, vote) {
    this.props.vote(uri, vote);
  }
  render() {
    return (
      <div className="queued-track">
        {this.props.track.artwork ? (
          <img
            src={this.props.track.artwork}
            alt="album cover art"
            style={{ height: 150 }}
          />
        ) : (
          ''
        )}
        {this.props.track.artist ? (
          <div className="">{this.props.track.artist}</div>
        ) : (
          ''
        )}
        {this.props.track.track ? (
          <div className="">{this.props.track.track}</div>
        ) : (
          ''
        )}
        {this.props.track.uri ? (
          <div>
            <button onClick={this.onVote.bind(this, this.props.track.uri, 1)}>
              Vote Up
            </button>
            <button onClick={this.onVote.bind(this, this.props.track.uri, -1)}>
              Vote Down
            </button>
            Votes: {this.props.track.votes}
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}
