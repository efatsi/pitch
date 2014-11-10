var React = require("react");

var socket   = require("../shared/socket");
var roomInfo = require("../shared/room_info");

socket.join("game", roomInfo.name, {}, function(channel) {
});

var GameApp = React.createClass({
  render() {
    return(
      <h3>Actual Game</h3>
    );
  }
});

module.exports = GameApp;
