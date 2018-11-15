import React, { Component } from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
import Search from './Search.js';

const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' }
    };
    this.addToPlaylist = this.addToPlaylist.bind(this);
  }
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }
  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState().then(response => {
      this.setState({
        nowPlaying: {
          name: response.item.name,
          albumArt: response.item.album.images[0].url
        }
      });
    });
  }
  addToPlaylist(spotifyTrackUri) {
    spotifyApi
      .addTracksToPlaylist('4xB6J9Q3SA10sppDePG2A7', [`${spotifyTrackUri}`])
      .then(response => {
        console.log(response);
      });
  }
  render() {
    return (
      <div className="App">
        <a href='https://radioroomserver.herokuapp.com'> Login to Spotify </a>
        <div>Now Playing: {this.state.nowPlaying.name}</div>
        <div>
          <img
            src={this.state.nowPlaying.albumArt}
            alt="album artistry"
            style={{ height: 150 }}
          />
        </div>
        {this.state.loggedIn && (
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        )}
        {this.state.loggedIn && (
          <button onClick={() => this.addToPlaylist()}>Add Track</button>
        )}
        <Search spotifyApi={spotifyApi} addToPlaylist={this.addToPlaylist} />
      </div>
    );
  }
}

export default App;
