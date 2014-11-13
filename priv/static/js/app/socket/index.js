var phoenix_socket = require("../shared/phoenix_socket")
var roomInfo       = require("../shared/room_info")
var GameHandler    = require("./handlers/game")
var ChatHandler    = require("./handlers/chat")

phoenix_socket.join("chat", roomInfo.name, {}, function(channel) {
  GameHandler(channel)
  ChatHandler(channel)
})
