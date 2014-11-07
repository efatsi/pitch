var React        = require("react");
var EventHandler = require("./event_handler.js");
var ChatApp      = require("./chat_app.js");

var roomInfo = document.getElementById("room_info");
var roomName = roomInfo.getAttribute("data-name");
var messages = JSON.parse(roomInfo.getAttribute("data-messages"));

var socket = new Phoenix.Socket("ws://" + location.host + "/ws");

socket.join("rooms", roomName, {}, function(channel) {
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
    EventHandler.userEntered(message.username);
  });

  channel.on("user:left", function(message) {
    EventHandler.userLeft(message.username);
  });
});

React.render(
  <ChatApp messages={messages} />,
  document.getElementById("chat-app")
);
