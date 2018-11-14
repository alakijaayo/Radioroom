import React from 'react';

export default class SearchTrack extends React.Component {
  constructor(props) {
    super(props);
    this.track = props.track;
    // this.onDelete = this.onDelete.bind(this);
  }
  // onDelete() {
  //   this.props.onDeletePeep(this.peep);
  // }
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
        <div className="">{this.track.name}</div>
        <button>Add</button>
      </div>
    );
  }
}
