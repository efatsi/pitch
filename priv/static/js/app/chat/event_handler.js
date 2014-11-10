var EventEmitter = require('events').EventEmitter;
var merge        = require('react/lib/merge');

var EventHandler = merge(EventEmitter.prototype, {
  addListener(eventName, callback) {
    this.on(eventName, callback);
  },

  removeListener(eventName, callback) {
    this.removeListener(eventName, callback);
  },

  login(username) {
    this.emit("login", username);
  },

  sendMessage(body) {
    this.emit("sendMessage", body)
  },

  newMessage(message) {
    var content = this.assemble(message.username, message.body);
    this.emit("chat", content);
  },

  userEntered(username) {
    var content = this.assemble(username, "entered");
    this.emit("chat", content);
  },

  userLeft(username) {
    var content = this.assemble(username, "left");
    this.emit("chat", content);
  },

  assemble(username, body) {
    return {username: username, body: body};
  }
})

module.exports = EventHandler;
