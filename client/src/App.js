import React, { Component } from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
import User from './User.js';
import NowPlaying from './NowPlaying.js';
import Queue from './Queue.js';
import Search from './Search.js';
import Player from './Player.js';
import Chat from './Chat.js';
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
    socket.on(
      'Queue Updated',
      function(queue) {
        console.log(queue);
        this.setState({
          upNext: queue
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
    this.addChatMessage = this.addChatMessage.bind(this);
    this.vote = this.vote.bind(this);
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

  vote(uri, vote) {
    const msg = vote === 1 ? 'vote up' : 'vote down';
    socket.emit(msg, uri);
  }

  addChatMessage(msg) {
    let chatMsg = {
      text: msg,
      user_url: this.state.user.imageUrl
    };
    socket.emit('chat message', JSON.stringify(chatMsg));
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
            <User user={this.state.user} />
            <NowPlaying nowPlaying={this.state.nowPlaying} />
            <Queue tracks={this.state.upNext} vote={this.vote} />
            <Search
              spotifyApi={spotifyApi}
              addToPlaylist={this.addToPlaylist}
            />
            <Chat
              messages={[
                {
                  id: 1,
                  text: 'Hello radioroom!',
                  user_url:
                    'https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/1381887_10201346045386534_973307961_n.jpg?_nc_cat=110&_nc_ht=scontent.xx&oh=469ec1722c45310e5fd3e5043e7eed66&oe=5C6DE405'
                }
              ]}
              addChatMessage={this.addChatMessage}
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
