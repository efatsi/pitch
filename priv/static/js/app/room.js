var React = require("react")
var Game  = require("./components/game")
var Chat  = require("./components/chat")

require("./socket")

React.render(
  <Game />, document.getElementById("game-app")
)

React.render(
  <Chat />, document.getElementById("chat-app")
)



