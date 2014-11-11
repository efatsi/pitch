var React    = require("react");
var ChatApp  = require("./app");
var roomInfo = require("../shared/room_info");

require("./socket_channel");

React.render(
  <ChatApp messages={roomInfo.messages} />,
  document.getElementById("chat-app")
);
