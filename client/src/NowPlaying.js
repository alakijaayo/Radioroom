import React from 'react';

export default class NowPlaying extends React.Component {
  render() {
    console.log(this.props.nowPlaying);
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
          </div>
        ) : (
          <div>Silence...</div>
        )}
      </div>
    );
  }
}
