import React from 'react';
import Queue from './Queue.js';
import App from './App.js'




export default class NowPlaying extends React.Component {

  constructor(props) {
    super(props);
    this.track = props.track;
    this.playNextTrack = this.playNextTrack.bind(this);
  }

  playNextTrack(uri, skip) {
    this.props.skip(uri, skip);
    this.playCurrentTrack();
  }

  render() {
    return (
      <div className="now-playing">
        <h2>Now Playing</h2>
        {this.props.nowPlaying.track !== '' ? (
          <div>
            <img
              src={this.props.nowPlaying.albumArt}
              alt="album cover art"
              style={{ height: 150 }}
            />
            <div>{this.props.nowPlaying.track}</div>
            <div>by {this.props.nowPlaying.artist}</div>
            <div>
            <button id ='skip'
            onClick={this.playNextTrack.bind(this, this.props.nowPlaying.uri)}>
            Skip
            </button>
            </div>
          </div>
        ) : (
          <div>Silence...</div>
        )}
      </div>
    );
  }
}
