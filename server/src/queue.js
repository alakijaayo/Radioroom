var queue = [];

exports.addTrack = function(track) {
  queue.push(Object.assign(track, { addedOn: new Date(), votes: 0 }));
};

exports.removeTrack = function(uri) {
  return 'test';
};

exports.getQueue = function() {
  return queue;
};
