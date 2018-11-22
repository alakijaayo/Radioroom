import React from 'react';
import SearchTrack from './SearchTrack.js';
import posed, { PoseGroup } from 'react-pose';

const Item = posed.li({});

export default class SearchTracks extends React.Component {
  render() {
    const { tracks } = this.props;
    return (
      <div className="tracks list-group mx-auto" style={{ maxWidth: 800 }}>
        {tracks && tracks.length > 0 ? (
          <ul>
            <PoseGroup>
              {tracks.map(track => (
                <Item
                  className="list-group-item border-0"
                  key={track.id || 'unique_dummy_id'}
                >
                  <SearchTrack
                    key={track.id || 'unique_dummy_id'}
                    track={track}
                    addToPlaylist={this.props.addToPlaylist}
                    removeTrack={this.props.removeTrack}
                  />
                </Item>
              ))}
            </PoseGroup>
          </ul>
        ) : (
          ''
        )}
      </div>
    );
  }
}
