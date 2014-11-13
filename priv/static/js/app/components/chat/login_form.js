var React   = require("react")
var Store   = require("../../stores/chat")
var Actions = require("../../actions/chat")

var LoginForm = React.createClass({
  login(e) {
    e.preventDefault()
    var username = this.refs.username.getDOMNode().value.trim()

    Actions.login(username)
    Store.set("loggedIn", true)
  },

  render() {
    return (
      <form className="chat-form" onSubmit={this.login}>
        <div className="input-group">
          <span className="input-group-addon">@</span>
          <input className="form-control" placeholder="Username" ref="username" />
          <span className="input-group-btn">
            <input type="submit" value=">" className="btn" />
          </span>
        </div>
      </form>
    )
  }
})

module.exports = LoginForm
