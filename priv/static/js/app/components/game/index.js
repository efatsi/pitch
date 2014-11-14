var React    = require("react")
var Store    = require("../../stores/game")
var Actions  = require("../../actions/chat")
var UserList = require("./user_list")

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

  render() {
    return (
      <div>
        <h3>Game area</h3>
        <UserList users={this.state.users} />
      </div>
    )
  }
})

module.exports = Game
