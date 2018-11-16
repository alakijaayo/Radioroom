import React, { Component } from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
import Search from './Search.js';
import Player from './Player.js';
import io from 'socket.io-client';

const spotifyApi = new SpotifyWebApi();
const socket = io('http://localhost:8888');

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.token = params.access_token;
    this.timerId = 0;
    this.state = {
      loggedIn: this.token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' }
    };
    this.addToPlaylist = this.addToPlaylist.bind(this);
    this.checkPlayerReady = this.checkPlayerReady.bind(this);
  }
  componentDidMount() {
    if (this.token) {
      spotifyApi.setAccessToken(this.token);
      if (window.PlayerReady) {
        this.player = new Player(this.token);
      } else {
        this.timerId = setInterval(this.checkPlayerReady, 100);
      }
    }
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
  addToPlaylist(spotifyTrack) {
    let queuedTrack = {
      uri: spotifyTrack.uri,
      artist: spotifyTrack.artists[0].name,
      track: spotifyTrack.name,
      artwork: spotifyTrack.album.images[0].url
    };
    this.player.playTrack(queuedTrack.uri);
    socket.emit('add to queue', JSON.stringify(queuedTrack));
  }
  checkPlayerReady() {
    console.log('timer fired');
    if (window.PlayerReady) {
      console.log(this.token);
      this.player = new Player(this.token);
      clearInterval(this.timerId);
    }
  }

  render() {
    let host =
      process.env.NODE_ENV === 'production'
        ? 'https://radioroomserver.herokuapp.com'
        : 'http://localhost:8888';
    return (
      <div className="App">
        <a href={host}> Login to Spotify </a>
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
