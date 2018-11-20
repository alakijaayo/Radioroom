const Queue = require('../src/queue.js');
const socket = { emit: () => {} };

let track = {
  uri: '1',
  artist: 'artist',
  track: 'track',
  artwork: 'url',
  duration: 10000
};
let track2 = {
  uri: '2',
  artist: 'artist 2',
  track: 'track 2',
  artwork: 'url 2',
  duration: 10000
};
let track3 = {
  uri: '3',
  artist: 'artist 3',
  track: 'track 3',
  artwork: 'url 3',
  duration: 10000
};
let track4 = {
  uri: '4',
  artist: 'artist 4',
  track: 'track 4',
  artwork: 'url 4',
  duration: 10000
};
let track5 = {
  uri: '5',
  artist: 'artist 5',
  track: 'track 5',
  artwork: 'url 5',
  duration: 10000
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
      queue = new Queue({ Date: Date, socket: socket });
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

    test('should not allow track addition twice', () => {
      queue.addTrack(track);
      expect(queue.getCurrentTrack()).toEqual(track)
      expect(queue.get().length).toEqual(0);
    })

    test('should ignore track being added to queue twice', () => {
      queue.addTrack(track2)
      queue.addTrack(track2)
      expect(queue.get()[0]).toEqual(track2)
      expect(queue.get().length).toEqual(1);
    })
  });

  describe('remove a track', () => {
    let queue;
    beforeEach(() => {
      queue = new Queue({ socket: socket });
      queue.addTrack(track);
      queue.addTrack(track2);
      queue.addTrack(track3);
    });

    describe('track 1 is removed', () => {
      beforeEach(() => {
        queue.removeTrack(track.uri);
      });
      test('track 2 is now playing', () => {
        expect(queue.getCurrentTrack()).toEqual(track2);
      });
      test('one track is in the queue', () => {
        expect(queue.get().length).toEqual(1);
      });
      test('track 3 is in the queue', () => {
        expect(queue.get()[0]).toEqual(track3);
      });
    });

    describe('track 2 is removed', () => {
      beforeEach(() => {
        queue.removeTrack(track2.uri);
      });
      test('track 1 is still playing', () => {
        expect(queue.getCurrentTrack()).toEqual(track);
      });
      test('one track is in the queue', () => {
        expect(queue.get().length).toEqual(1);
      });
      test('track 3 is in the queue', () => {
        expect(queue.get()[0]).toEqual(track3);
      });
    });

    describe('track 3 is removed', () => {
      beforeEach(() => {
        queue.removeTrack(track3.uri);
      });
      test('track 1 is still playing', () => {
        expect(queue.getCurrentTrack()).toEqual(track);
      });
      test('one track is in the queue', () => {
        expect(queue.get().length).toEqual(1);
      });
      test('track 2 is in the queue', () => {
        expect(queue.get()[0]).toEqual(track2);
      });
    });
  });

  describe('sort tracks', () => {
    let queue;
    beforeAll(() => {
      queue = new Queue({ socket: socket });
      queue.addTrack(track3);
      queue.addTrack(track5);
      queue.addTrack(track);
      queue.addTrack(track4);
      queue.addTrack(track2);
      queue.vote(track.uri, 4);
      queue.vote(track2.uri, 2);
      queue.vote(track4.uri, 3);
      queue.vote(track5.uri, -1);
      console.log(queue.get());
    });
    test('the now playing track should not move', () => {
      expect(queue.getCurrentTrack()).toBe(track3);
    });
    test('track with most votes should be up next', () => {
      expect(queue.get()[0]).toBe(track);
    });
    test('track with least votes should be last', () => {
      expect(queue.get().slice(-1)[0]).toBe(track5);
    });
    test('track 4 should be second in the queue', () => {
      expect(queue.get()[1]).toBe(track4);
    });
    test('track 2 should be third in the queue', () => {
      expect(queue.get()[2]).toBe(track2);
    });
  });
});
