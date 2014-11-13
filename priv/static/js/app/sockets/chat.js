var socket     = require("../shared/phoenix_socket")
var roomInfo   = require("../shared/room_info")
var Dispatcher = require("../dispatcher")
var Actions    = require("../shared/actions")
var Store      = require("../stores/chat")

socket.join("chat", roomInfo.name, {}, function(channel) {
  login = function(username) {
    var token = Math.random().toString(36).substr(8)
    channel.send("user:new", {username: username, token: token})
  }

  sendMessage = function(body) {
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
    Store.add_message(message)
  })

  channel.on("user:entered", function(user) {
    Store.add_user(user)
  })

  channel.on("user:left", function(user) {
    Store.remove_user(user)
  })
})