class Queue {
  constructor(props = {}) {
    this.user_count = 0
    this.queue = [];
    this.nowPlaying = null;
    this.socket;
    this.timerId = 0;
    if (props.Date) {
      Date = props.Date;
    }
    if (props.socket) {
      this.socket = props.socket;
    }
    this.isTrackPlaying = this.isTrackPlaying.bind(this);
    this.notifyNowPlaying = this.notifyNowPlaying.bind(this);
    this.notifyQueueUpdated = this.notifyQueueUpdated.bind(this);
    this.playCurrentTrack = this.playCurrentTrack.bind(this);
    this.playNextTrack = this.playNextTrack.bind(this);
    this.sortNextByVotes = this.sortNextByVotes.bind(this);
  }

  addTrack(track) {
    let newTrack = Object.assign(track, { addedOn: new Date(), votes: 0, skipCount: 0});
    if (this.nowPlaying === null) {
      this.nowPlaying = newTrack;
      this.playCurrentTrack();
    } else if (
      !this.isTrackPlaying(newTrack) &&
      !this.isTrackInQueue(newTrack)
    ) {
      this.queue.push(newTrack);
      this.notifyQueueUpdated();
    }
  }




  get() {
    return this.queue.slice(0);
  }

  getCurrentTrack() {
    return this.nowPlaying;
  }

  isTrackPlaying(track) {
    return this.nowPlaying.uri === track.uri;
  }

  isTrackInQueue(track) {
    return this.queue.some(t => t.uri === track.uri);
  }

  playCurrentTrack() {
    if (this.timerId !== 0) {
      clearTimeout(this.timerId);
    }
    if (this.nowPlaying !== null) {
      this.timerId = setTimeout(this.playNextTrack, this.nowPlaying.duration);
      this.nowPlaying.startTime = new Date().getTime();
    }
    this.notifyNowPlaying();
  }

  playNextTrack() {
    if (this.queue.length > 0) {
      this.nowPlaying = this.queue.shift();
      this.notifyQueueUpdated();
    } else {
      this.nowPlaying = null;
    }
    this.playCurrentTrack();
  }


  notifyNowPlaying() {
    if (this.nowPlaying) {
      this.nowPlaying.timeOffset =
        new Date().getTime() - this.nowPlaying.startTime;
    }
    this.socket.emit('Play Track', this.nowPlaying);
  }

  notifyQueueUpdated() {
    this.socket.emit('Queue Updated', this.queue);
  }

  removeTrack(uri) {
    if (this.nowPlaying.uri === uri) {
      this.playNextTrack();
    } else {
      this.queue = this.queue.filter(track => {
        return track.uri !== uri;
      });
    }
    this.notifyQueueUpdated();
  }

  sortNextByVotes() {
    this.queue.sort((a, b) => {
      if (a.votes < b.votes) {
        return 1;
      }
      if (a.votes > b.votes) {
        return -1;
      }
      if (a.addedOn < b.addedOn) {
        return -1;
      }
      if (a.addedOn > b.addedOn) {
        return 1;
      }
      return 0;
    });
  }

  vote(uri, increment) {
    const index = this.queue
      .map(t => {
        return t.uri;
      })
      .indexOf(uri);
    this.queue[index].votes += increment;
    this.sortNextByVotes();
    this.notifyQueueUpdated();
  }
}

module.exports = Queue;
