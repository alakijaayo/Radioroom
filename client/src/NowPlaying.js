import React from 'react';
import Queue from './Queue.js';
import App from './App.js'

export default class NowPlaying extends React.Component {
  constructor(props) {
     super(props);
     this.track = props.track;
     this.onSkip = this.onSkip.bind(this);
   }

   onSkip(track, skip) {
     this.props.skip();
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
           <button onClick={this.onSkip.bind(this, this.props.nowPlaying.uri, )}>
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
