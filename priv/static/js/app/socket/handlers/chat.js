var Dispatcher = require("../../dispatcher")
var Actions    = require("../../shared/actions")
var ChatStore  = require("../../stores/chat")

var ChatHandler = function(channel) {
  var login = function(username) {
    var token = Math.random().toString(36).substr(8)
    channel.send("user:new", {username: username, token: token})
  }

  var sendMessage = function(body) {
    channel.send("message:new", {body: body})
  }

  Dispatcher.register(function(payload) {
    switch (payload.type) {
      case Actions.NEW_MESSAGE:
        sendMessage(payload.body)
        break

      case Actions.LOGIN:
        login(payload.username)
        break

      default:
        // no-op
    }
  })

  channel.on("message:new", function(message) {
    ChatStore.add_message(message)
  })

  channel.on("user:entered", function(user) {
    ChatStore.add_user(user)
  })

  channel.on("user:left", function(user) {
    ChatStore.remove_user(user)
  })
}

module.exports = ChatHandler
