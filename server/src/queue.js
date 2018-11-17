let queue = [];
let socket;
let timerId = 0;

class Queue {
  constructor(props = {}) {
    if (props.Date) {
      Date = props.Date;
    }
    if (props.socket) {
      socket = props.socket;
    }
    this.playCurrentTrack = this.playCurrentTrack.bind(this);
    this.playNextTrack = this.playNextTrack.bind(this);
  }
  addTrack(track) {
    queue.push(Object.assign(track, { addedOn: new Date(), votes: 0 }));
    if (queue.length === 1) {
      this.playCurrentTrack();
    }
  }
  get() {
    return queue.slice(0);
  }
  getCurrentTrack() {
    return queue.length > 0 ? queue[0] : {};
  }
  playCurrentTrack() {
    if (timerId !== 0) {
      clearTimeout(timerId);
    }
    if (queue.length > 0) {
      let track = this.getCurrentTrack();
      timerId = setTimeout(this.playNextTrack, track.duration);
      socket.emit('Play Track', track);
    }
  }
  playNextTrack() {
    queue.shift();
    this.playCurrentTrack();
  }
  removeTrack(uri) {
    queue = queue.filter(track => {
      return track.uri !== uri;
    });
  }
  sortNextByVotes() {
    let nextQueue = queue.slice(1);
    nextQueue.sort((a, b) => {
      if (a.votes < b.votes) {
        return 1;
      }
      if (a.votes > b.votes) {
        return -1;
      }
      if (a.addedOn < b.addedOn) {
        return 1;
      }
      if (a.addedOn > b.addedOn) {
        return -1;
      }
      return 0;
    });
    nextQueue.unshift(queue[0]);
    queue = nextQueue;
  }
  vote(uri, increment) {
    const index = queue
      .map(t => {
        return t.uri;
      })
      .indexOf(uri);
    queue[index].votes += increment;
  }
}

module.exports = Queue;
