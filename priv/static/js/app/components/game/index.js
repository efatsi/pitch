var React   = require("react")
var Store   = require("../../stores/game")
var Actions = require("../../actions/chat")
var User    = require("./user")

var Game = React.createClass({
  getInitialState() {
    return this.getState()
  },

  getState() {
    return Store.snapshot()
  },

  updateState() {
    this.setState(this.getState())
  },

  componentDidMount() {
    Store.onChange(this.updateState)
  },

  componentWillUnmount() {
    Store.offChange(this.updateState)
  },

  users() {
    return this.state.users.map(function(user, i) {
      return <User key={user.id} username={user.username} />
    })
  },

  userList() {
    return (
      <div id="users">
        <h4>Users present ({this.state.userCount}):</h4>
        <ul>
          {this.users()}
        </ul>
      </div>
    )
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
