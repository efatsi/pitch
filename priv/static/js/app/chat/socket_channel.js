var EventHandler  = require("./event_handler");
var GlobalHandler = require("../shared/event_handler");
var socket        = require("../shared/socket");
var roomInfo      = require("../shared/room_info");

socket.join("chat", roomInfo.name, {}, function(channel) {
  login = function(username) {
    var token = Math.random().toString(36).substr(8);
    channel.send("user:new", {username: username, token: token});
  }

  sendMessage = function(body) {
    channel.send("message:new", {body: body});
  }

  EventHandler.addListener("login", login);
  EventHandler.addListener("sendMessage", sendMessage);

  channel.on("message:new", function(message) {
    EventHandler.newMessage(message);
  });

  channel.on("user:entered", function(message) {
    var username = message.username;

    GlobalHandler.userActivity();
    EventHandler.userEntered(username);
  });

  channel.on("user:left", function(message) {
    var username = message.username;

    GlobalHandler.userActivity();
    EventHandler.userLeft(username);
  });
});
