class Player {
  constructor(token, onPlayerReady) {
    this.token = token;
    this.player = new window.Spotify.Player({
      name: 'RadioRoom Player',
      getOAuthToken: cb => {
        cb(token);
      }
    });

    this.deviceId = '';

    // Error handling
    this.player.addListener('initialization_error', ({ message }) => {
      console.error(message);
    });
    this.player.addListener('authentication_error', ({ message }) => {
      console.error(message);
    });
    this.player.addListener('account_error', ({ message }) => {
      console.error(message);
    });
    this.player.addListener('playback_error', ({ message }) => {
      console.error(message);
    });

    // Playback status updates
    this.player.addListener('player_state_changed', state => {
      console.log(state);
    });

    // Ready
    this.player.addListener('ready', ({ device_id }) => {
      this.deviceId = device_id;
      console.log('Ready with Device ID', device_id);
      onPlayerReady();
    });

    // Not Ready
    this.player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    // Connect to the this.player!
    this.player.connect();
  }
  playTrack(uri, offset) {
    fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          uris: [uri],
          position_ms: offset
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`
        }
      }
    );
  }
}

export default Player;
