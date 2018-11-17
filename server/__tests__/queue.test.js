const Queue = require('../src/queue.js');

describe('Queue', () => {
  let track = {
    uri: '1',
    artist: 'artist',
    track: 'track',
    artwork: 'url'
  };

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
      queue = new Queue(Date);
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
});
