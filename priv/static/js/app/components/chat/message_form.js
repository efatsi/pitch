var React   = require("react")
var Actions = require("../../actions/chat")

var MessageForm = React.createClass({
  sendMessage(e) {
    e.preventDefault()
    var message = this.refs.message.getDOMNode().value.trim()

    Actions.newMessage(message)
    this.refs.message.getDOMNode().value = ""
  },

  render() {
    return (
      <form className="chat-form" onSubmit={this.sendMessage}>
        <div className="input-group">
          <input className="form-control" ref="message" />
          <span className="input-group-btn">
            <input type="submit" value="Send" className="btn" />
          </span>
        </div>
      </form>
    )
  }
})

module.exports = MessageForm
