import React, { Component } from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
import Search from './Search.js';
import Player from './Player.js';
import io from 'socket.io-client';

const spotifyApi = new SpotifyWebApi();
const socket = io(
  process.env.NODE_ENV === 'production'
    ? 'https://radioroomserver.herokuapp.com'
    : 'http://localhost:8888'
);

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    socket.on(
      'Play Track',
      function(track) {
        console.log(track);
        this.player.playTrack(track.uri);
        this.setState({
          nowPlaying: {
            artist: track.artist,
            track: track.track,
            albumArt: track.artwork
          }
        });
      }.bind(this)
    );
    this.token = params.access_token;
    this.refreshToken = params.refresh_token;
    this.timerId = 0;
    this.state = {
      loggedIn: this.token ? true : false,
      nowPlaying: { artist: '', track: '', albumArt: '' },
      user: {
        name: params.user_name,
        id: params.user_id,
        imageUrl: params.user_image_url
      }
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
          artist: response.item.artists[0].name,
          track: response.item.name,
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
      artwork: spotifyTrack.album.images[0].url,
      duration: spotifyTrack.duration_ms
    };
    socket.emit('add to queue', JSON.stringify(queuedTrack));
  }
  checkPlayerReady() {
    if (window.PlayerReady) {
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
        <h1>RadioRoom</h1>
        {this.state.loggedIn ? (
          <div>
            <div>
              <img
                src={this.state.user.imageUrl}
                alt="user profile"
                style={{ height: 150 }}
              />
              <span>{this.state.user.name}</span>
              <span> ({this.state.user.id})</span>
            </div>
            <div>Now Playing:</div>
            <div>
              <img
                src={this.state.nowPlaying.albumArt}
                alt="album cover art"
                style={{ height: 150 }}
              />
            </div>
            <div>{this.state.nowPlaying.track}</div>
            <div>by {this.state.nowPlaying.artist}</div>
            <Search
              spotifyApi={spotifyApi}
              addToPlaylist={this.addToPlaylist}
            />
          </div>
        ) : (
          <div>
            <h2>To get started, please login via Spotify</h2>
            <p>
              <strong>Note:</strong> to enjoy the full experience of RadioRoom
              you need to have a Spotify Premium subscription
            </p>
            <a className="spotify-login-btn" href={host}>
              Login to Spotify
            </a>
          </div>
        )}
      </div>
    );
  }
}

export default App;
