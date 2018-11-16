
class Player{
constructor(token) {
  this.player = new window.Spotify.Player({
    name: 'RadioRoom Player',
    getOAuthToken: cb => { cb(token); }
  });

  let userDeviceId = ''


  // Error handling
  this.player.addListener('initialization_error', ({ message }) => { console.error(message); });
  this.player.addListener('authentication_error', ({ message }) => { console.error(message); });
  this.player.addListener('account_error', ({ message }) => { console.error(message); });
  this.player.addListener('playback_error', ({ message }) => { console.error(message); });

  // Playback status updates
  this.player.addListener('player_state_changed', state => { console.log(state); });

  // Ready
  this.player.addListener('ready', ({ device_id }) => {
    userDeviceId = device_id
    console.log('Ready with Device ID', device_id);
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${userDeviceId}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: ['spotify:track:5wVylZHmBid99XzEsz8Fk7'] }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
  });

  // Not Ready
  this.player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });



  // Connect to the this.player!
  this.player.connect();


}


}


export default Player;
