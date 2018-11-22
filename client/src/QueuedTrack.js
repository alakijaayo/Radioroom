import React from 'react';

export default class QueuedTrack extends React.Component {
  constructor(props) {
    super(props);
    this.onVote = this.onVote.bind(this);
    this.state = { isButtonDisabled: false };
  }
  onVote(uri, vote) {
    this.props.vote(uri, vote);
    this.setState({
      isButtonDisabled: true
    });
  }
  render() {
    return (
      <div className="queued-track d-flex justify-content-between w-100">
        <div className="w-20 align-self-center">
          {this.props.track.artwork ? (
            <img
              src={this.props.track.artwork}
              alt="album cover art"
              style={{ height: 100 }}
            />
          ) : (
            ''
          )}
          <div>added by {this.props.track.user.split(' ')[0]}</div>
        </div>
        <div className="flex-grow-1 align-self-center text-left">
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
        </div>
        {this.props.track.uri ? (
          <div className="w-10 align-self-center">
            <button
              id="Upvote"
              onClick={this.onVote.bind(this, this.props.track.uri, 1)}
              disabled={this.state.isButtonDisabled}
              className="btn btn-secondary"
            >
              ↑
            </button>
            <button
              id="Downvote"
              onClick={this.onVote.bind(this, this.props.track.uri, -1)}
              disabled={this.state.isButtonDisabled}
              className="btn btn-secondary"
            >
              ↓
            </button>
            {/* Votes: {this.props.track.votes} */}
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}
