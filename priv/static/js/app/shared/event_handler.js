var EventEmitter = require('events').EventEmitter;
var merge        = require('react/lib/merge');

var EventHandler = merge(EventEmitter.prototype, {
  addListener(eventName, callback) {
    this.on(eventName, callback);
  },

  removeListener(eventName, callback) {
    this.removeListener(eventName, callback);
  },

  userActivity() {
    this.emit("userActivity");
  }
})

module.exports = EventHandler;
