import React from 'react';

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
    console.log(this.props.nowPlaying);
    return (
      <div className="now-playing">
        <h2>Now Playing</h2>
        {this.props.nowPlaying.track !== '' ? (
          <div>
            <img
              className="w-75"
              src={this.props.nowPlaying.albumArt}
              alt="album cover art"
              style={{ maxWidth: 400 }}
            />
            <div style={{ marginTop: -100 }}>
              <button
                onClick={this.onSkip.bind(this, this.props.nowPlaying.uri)}
                disabled={this.props.skipEnable}
                className="btn btn-secondary"
              >
                Skip
              </button>
            </div>
            <div style={{ marginTop: 60 }}>
              <div>{this.props.nowPlaying.track}</div>
              <div>by {this.props.nowPlaying.artist}</div>
            </div>
          </div>
        ) : (
          <div>Silence...</div>
        )}
      </div>
    );
  }
}
