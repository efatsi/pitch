var React   = require("react");
var GameApp = require("./app");

require("./socket_channel");

React.render(
  <GameApp />,
  document.getElementById("game-app")
);
