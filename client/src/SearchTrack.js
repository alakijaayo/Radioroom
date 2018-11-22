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
      <div className="track d-flex justify-content-between w-100">
        {this.track.album ? (
          <img
            className="w-20 align-self-center"
            src={this.track.album.images[0].url}
            alt="album cover art"
            style={{ height: 100 }}
          />
        ) : (
          ''
        )}
        <div className="flex-grow-1 align-self-center text-left">
          {this.track.artists ? (
            <div className="">{this.track.artists[0].name}</div>
          ) : (
            ''
          )}
          {this.track.id ? <div className="">{this.track.name}</div> : ''}
        </div>
        {this.track.id ? (
          <button
            className="w-20 align-self-center btn btn-secondary"
            onClick={this.onAddToPlaylist}
            style={{ height: 40, minWidth: 80 }}
          >
            Add
          </button>
        ) : (
          ''
        )}
      </div>
    );
  }
}
