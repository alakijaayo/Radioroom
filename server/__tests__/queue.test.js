const Queue = require('../src/queue.js');
const socket = { emit: () => {} };

let track = {
  uri: '1',
  artist: 'artist',
  track: 'track',
  artwork: 'url'
};
let track2 = {
  uri: '2',
  artist: 'artist 2',
  track: 'track 2',
  artwork: 'url 2'
};
let track3 = {
  uri: '3',
  artist: 'artist 3',
  track: 'track 3',
  artwork: 'url 3'
};
let track4 = {
  uri: '4',
  artist: 'artist 4',
  track: 'track 4',
  artwork: 'url 4'
};
let track5 = {
  uri: '5',
  artist: 'artist 5',
  track: 'track 5',
  artwork: 'url 5'
};

describe('Queue', () => {
  describe('add a track', () => {
    let queue;
    const fixedDate = new Date('2018-11-17T09:39:59');
    let originalDate;

    beforeAll(() => {
      originalDate = Date;
      Date = class extends Date {
        constructor() {
          super();
          return fixedDate;
        }
      };
      queue = new Queue({ Date: Date });
      queue.addTrack(track);
    });

    afterAll(() => {
      Date = originalDate;
    });

    test('queue should contain track', () => {
      expect(queue.getCurrentTrack().uri).toEqual(track.uri);
    });

    test('track should have zero votes', () => {
      expect(queue.getCurrentTrack().votes).toEqual(0);
    });

    test('track should have date added', () => {
      expect(queue.getCurrentTrack().addedOn).toEqual(new Date());
    });
  });

  describe('remove a track', () => {
    let queue = new Queue({ socket: socket });
    queue.addTrack(track);

    test('track is removed', () => {
      queue.removeTrack(track.uri);
      expect(queue.getCurrentTrack()).toEqual({});
    });
  });

  describe('sort tracks', () => {
    let queue;
    beforeAll(() => {
      queue = new Queue();
      queue.addTrack(track3);
      queue.addTrack(track5);
      queue.addTrack(track);
      queue.addTrack(track4);
      queue.addTrack(track2);
      queue.vote(track.uri, 4);
      queue.vote(track2.uri, 2);
      queue.vote(track4.uri, 2);
      queue.vote(track5.uri, -1);
      queue.sortNextByVotes();
    });
    test('first track should not move', () => {
      expect(queue.getCurrentTrack()).toBe(track3);
    });
    test('track with most votes should be up next', () => {
      expect(queue.get()[1]).toBe(track);
    });
    test('track with least votes should be last', () => {
      expect(queue.get().slice(-1)[0]).toBe(track5);
    });
    test('track 4 should be third', () => {
      expect(queue.get()[2]).toBe(track4);
    });
    test('track 2 should be fourth', () => {
      expect(queue.get()[3]).toBe(track2);
    });
  });
});
