var _            = require("underscore");
var React        = require("react");
var EventHandler = require("./event_handler");

var GameApp = React.createClass({
  getInitialState() {
    return {users: []};
  },

  componentDidMount() {
    EventHandler.addListener("userActivity", this.userActivity);
  },

  userActivity(users) {
    this.setState({users: users});
  },

  userLeft(username) {
    this.state.users.splice(this.state.indexOf(username), 1);
  },

  users() {
    return _.map(this.state.users, function(username, i) {
      return <div>{username}</div>;
    });
  },

  render() {
    return(
      <div>
        <h3>Game area</h3>
        <h4>Users Present:</h4>
        {this.users()}
      </div>
    );
  }
});

module.exports = GameApp;
