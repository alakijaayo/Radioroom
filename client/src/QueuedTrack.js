import React from 'react';

export default class QueuedTrack extends React.Component {
  constructor(props) {
    super(props);
    this.onVote = this.onVote.bind(this);
    this.state = {isButtonDisabled: false};

  }
  onVote(uri, vote) {
   this.props.vote(uri, vote);
   this.setState({
     isButtonDisabled: true
   });
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
           <button id='Upvote'
            onClick={this.onVote.bind(this, this.props.track.uri, 1)}
            disabled={this.state.isButtonDisabled}>
             Vote Up
           </button>
           or
           <button id='Downvote'
           onClick={this.onVote.bind(this, this.props.track.uri, -1)}
           disabled={this.state.isButtonDisabled}>
             Vote Down
           </button>
           Votes: {this.props.track.votes}
         </div>
        ) : (
          ''
        )}
        {this.props.track.user ? (
          <h4>{this.props.track.user} added this track to the Playlist</h4>
        ) : (
          ''
        )}
      </div>
    );
  }
}
