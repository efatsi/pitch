var React = require("react")
var Chat  = require("./components/chat")

require("./sockets/chat")

React.render(
  <Chat />, document.getElementById("chat-app")
)
