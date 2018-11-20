import React from 'react';
import QueuedTrack from './QueuedTrack.js';
import posed, { PoseGroup } from 'react-pose';

const Item = posed.li({});

export default class Queue extends React.Component {
  render() {
    const { tracks } = this.props;
    return (
      <div className="queued-tracks">
        <h2>Up Next</h2>
        {tracks && tracks.length > 0 ? (
          <ul>
            <PoseGroup>
              {tracks.map(track => (
                <Item key={track.uri}>
                  <QueuedTrack
                    key={track.uri + '!' || 'unique_dummy_id'}
                    track={track}
                    vote={this.props.vote}
                  />
                </Item>
              ))}
            </PoseGroup>
          </ul>
        ) : (
          <div>Empty...</div>
        )}
      </div>
    );
  }
}
