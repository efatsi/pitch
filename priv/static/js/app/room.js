var React   = require("react");
var ChatApp = require("./chat_app.js");

require("./chat_socket.js")

var roomInfo = document.getElementById("room_info");
var messages = JSON.parse(roomInfo.getAttribute("data-messages"));

React.render(
  <ChatApp messages={messages} />,
  document.getElementById("chat-app")
);
