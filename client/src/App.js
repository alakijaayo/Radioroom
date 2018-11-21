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
    this.timerId = 0;
    this.addChatMessage = this.addChatMessage.bind(this);
    this.addToPlaylist = this.addToPlaylist.bind(this);
    this.checkPlayerReady = this.checkPlayerReady.bind(this);
    this.initialiseSocket = this.initialiseSocket.bind(this);
    this.syncClient = this.syncClient.bind(this);
    this.vote = this.vote.bind(this);
    this.skip = this.skip.bind(this);
    this.initialiseSocket();
    this.token = params.access_token;
    this.refreshToken = params.refresh_token;
    this.state = {
      loggedIn: this.token ? true : false,
      nowPlaying: { artist: '', track: '', albumArt: '' },
      user: {
        name: params.user_name,
        id: params.user_id,
        imageUrl:
          params.user_image_url && params.user_image_url.length > 0
            ? params.user_image_url
            : `${process.env.PUBLIC_URL}/img/user.png`
      },
      users: []

    };
  }


  componentDidMount() {
    if (this.token) {
      spotifyApi.setAccessToken(this.token);
      this.timerId = setInterval(this.checkPlayerReady, 100);
    }
    this.syncClient();
  }

  addChatMessage(msg) {
    let chatMsg = {
      text: msg,
      user_url: this.state.user.imageUrl
    };
    socket.emit('chat message', JSON.stringify(chatMsg));
  }

  addToPlaylist(spotifyTrack) {
    let queuedTrack = {
      uri: spotifyTrack.uri,
      artist: spotifyTrack.artists[0].name,
      track: spotifyTrack.name,
      artwork: spotifyTrack.album.images[0].url,
      duration: spotifyTrack.duration_ms,
      user: this.state.user.name
    };
    socket.emit('add to queue', JSON.stringify(queuedTrack));
  }

  checkPlayerReady() {
    if (window.PlayerReady) {
      this.player = new Player(this.token, this.onPlayerReady);
      clearInterval(this.timerId);
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

  initialiseSocket() {
    socket.on('Play Track', track => {
      if (track) {
        this.player.playTrack(track.uri, track.timeOffset);
        this.setState({
          nowPlaying: {
            artist: track.artist,
            track: track.track,
            albumArt: track.artwork
          },
          skipEnable: false
        });
      } else {
        this.setState({
          nowPlaying: {
            artist: '',
            track: '',
            albumArt: ''
          }
        });
      }
    });

    socket.on('User Joined Radioroom', user => {
      console.log('user.name joined room')
    })

    socket.on('Update Users', users => {
      this.setState({
        users: users
      })
      console.log(users)
    });



    socket.on('Queue Updated', queue => {
      this.setState({
        upNext: queue
      });
    });

    socket.on('Chat Updated', messages => {
      this.setState({
        chat: messages
      });
    });
  }

  onPlayerReady() {
    socket.emit('now playing');
  }



  syncClient() {
    socket.emit('sync client', JSON.stringify(this.state.user));

  }

  vote(uri, vote) {
    const msg = vote === 1 ? 'vote up' : 'vote down';
    socket.emit(msg, uri);
  }

  skip(uri, skip) {
   socket.emit('skip', uri);
   this.setState({skipEnable: false});
 }

  render() {
    let host =
      process.env.NODE_ENV === 'production'
        ? 'https://radioroomserver.herokuapp.com'
        : 'http://localhost:8888';
    return (
      <div className="App">
        <h1>RadioRoom</h1>
        <h3>Users:{this.state.users.length}</h3>
        {this.state.loggedIn ? (
          <div>
            <User user={this.state.user} />
            <NowPlaying nowPlaying={this.state.nowPlaying} skip={this.skip}
            skipEnable={this.state.skipEnable}
            usercount={this.state.users.length} votecount={this.state.vote}/>
            <Queue tracks={this.state.upNext} vote={this.vote} />
            <Search
              spotifyApi={spotifyApi}
              addToPlaylist={this.addToPlaylist}
            />
            <Chat
              messages={this.state.chat}
              addChatMessage={this.addChatMessage}
            />
          </div>
        ) : (
          <div>
            <h2>To get started, please login via Spotify</h2>
            <p>
              <strong>Note:</strong> To enjoy the full experience of RadioRoom
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
