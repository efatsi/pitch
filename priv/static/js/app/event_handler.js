var EventEmitter = require('events').EventEmitter;
var merge        = require('react/lib/merge');

var EventHandler = merge(EventEmitter.prototype, {
  // set by the socket connection
  socketAPI: null,

  login(username) {
    this.socketAPI.login(username);
  },

  sendMessage(body) {
    this.socketAPI.sendMessage(body);
  },

  addEventListener(callback) {
    this.on("event", callback);
  },

  removeEventListener(callback) {
    this.removeListener("event", callback);
  },

  newMessage(message) {
    var content = this.assemble(message.username, message.body);
    this.emit("event", content);
  },

  userEntered(username) {
    var content = this.assemble(username, "entered");
    this.emit("event", content);
  },

  userLeft(username) {
    var content = this.assemble(username, "left");
    this.emit("event", content);
  },

  assemble(username, body) {
    return {username: username, body: body};
  }
})

module.exports = EventHandler;
