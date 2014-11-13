var React     = require("react")
var GameStore = require("../../stores/game")
var Actions   = require("../../actions/chat")
var User      = require("./user")

var Game = React.createClass({
  getInitialState() {
    return this.getState()
  },

  getState() {
    return {
      users: GameStore.get("users"),
    }
  },

  updateState() {
    this.setState(this.getState())
  },

  componentDidMount() {
    GameStore.onChange(this.updateState)
  },

  componentWillUnmount() {
    GameStore.offChange(this.updateState)
  },

  users() {
    return this.state.users.map(function(user, i) {
      return <User key={user.id} username={user.username} />
    })
  },

  userList() {
    if (this.state.users.length) {
      return (
        <div id="users">
          <h4>Users present:</h4>
          <ul>
            {this.users()}
          </ul>
        </div>
      )
    }
  },

  render() {
    return (
      <div>
        <h3>Game area</h3>
        {this.userList()}
      </div>
    )
  }
})

module.exports = Game
