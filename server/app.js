/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const Queue = require('./src/queue.js');
const queue = new Queue({ socket: io });

let chat = [];
//Use dotnev to read .env vars into Node
require('dotenv').config();
var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;
var redirect_uri = process.env.REDIRECT_URI;
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

app
  .use(express.static(__dirname + '/public'))
  .use(cors())
  .use(cookieParser());

app.get('/login', function(req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope =
    'user-read-private user-read-email user-read-playback-state user-read-birthdate streaming';
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      })
  );
});

app.get('/callback', function(req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      '/#' +
        querystring.stringify({
          error: 'state_mismatch'
        })
    );
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        Authorization:
          'Basic ' +
          new Buffer(client_id + ':' + client_secret).toString('base64')
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token;

        var host =
          process.env.NODE_ENV === 'production'
            ? 'https://makersradioroom.herokuapp.com/#'
            : 'http://localhost:3000/#';

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { Authorization: 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          // we can also pass the token to the browser to make requests from there
          res.redirect(
            host +
              querystring.stringify({
                access_token: access_token,
                refresh_token: refresh_token,
                user_name: body.display_name,
                user_id: body.id,
                user_image_url: body.images[0].url
              })
          );
        });
      } else {
        res.redirect(
          '/#' +
            querystring.stringify({
              error: 'invalid_token'
            })
        );
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization:
        'Basic ' +
        new Buffer(client_id + ':' + client_secret).toString('base64')
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        access_token: access_token
      });
    }
  });
});

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('add to queue', function(spotifyTrack) {
    let track = JSON.parse(spotifyTrack);
    queue.addTrack(track);
  });
  socket.on('chat message', function(msg) {
    let newMsg = JSON.parse(msg);
    newMsg.id = chat.length + 1;
    chat.unshift(newMsg);
    io.emit('Chat Updated', chat);
  });
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
  socket.on('now playing', function(msg) {
    queue.notifyNowPlaying();
  });
  socket.on('sync client', function(user) {
    queue.notifyQueueUpdated();
    io.emit('Chat Updated', chat);
  });
  socket.on('vote down', function(uri) {
    queue.vote(uri, -1);
  });
  socket.on('vote up', function(uri) {
    queue.vote(uri, 1);
  });
  socket.on('skip', function(uri) {
     queue.skip(uri);
   });
});

http.listen(process.env.PORT || 8888, function() {
  console.log(`Listening on ${process.env.PORT || 8888}`);
});
