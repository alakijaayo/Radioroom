let queue = [];

class Queue {
  constructor(Date = Date) {}
  addTrack(track) {
    queue.push(Object.assign(track, { addedOn: new Date(), votes: 0 }));
  }
  removeTrack(uri) {
    return 'test';
  }
  getCurrentTrack() {
    return queue[0];
  }
}

module.exports = Queue;
