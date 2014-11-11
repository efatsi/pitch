var GlobalHandler = require("../shared/event_handler");
var socket        = require("../shared/socket");
var roomInfo      = require("../shared/room_info");
var EventHandler  = require("./event_handler");

socket.join("game", roomInfo.name, {}, function(channel) {
  userActivity = function() {
    channel.send("user:activity", {});
  }

  GlobalHandler.addListener("userActivity", userActivity);
  userActivity();

  channel.on("users", function(message) {
    console.log("users event from server")
    console.log(message)
    EventHandler.userActivity(message.users);
  });
});
