import React from 'react';

export default class SearchTrack extends React.Component {
  constructor(props) {
    super(props);
    this.track = props.track;
    this.onAddToPlaylist = this.onAddToPlaylist.bind(this);
  }
  onAddToPlaylist() {
    this.props.addToPlaylist(this.track);
    this.props.removeTrack(this.track.uri);
  }
  render() {
    return (
      <div className="track">
        {this.track.album ? (
          <img
            src={this.track.album.images[0].url}
            alt="album cover art"
            style={{ height: 150 }}
          />
        ) : (
          ''
        )}
        {this.track.artists ? (
          <div className="">{this.track.artists[0].name}</div>
        ) : (
          ''
        )}
        {this.track.id ? <div className="">{this.track.name}</div> : ''}
        {this.track.id ? (
          <button onClick={this.onAddToPlaylist}>Add</button>
        ) : (
          ''
        )}
      </div>
    );
  }
}
