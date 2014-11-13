var React   = require("react")
var Message = require("./message")
var Store   = require("../../stores/chat")
var Actions = require("../../actions/chat")

var Chat = React.createClass({
  getInitialState() {
    return this.getState()
  },

  getState() {
    return {
      loggedIn: Store.get("loggedIn"),
      messages: Store.get("messages")
    }
  },

  updateState() {
    this.setState(this.getState())
  },

  componentWillMount() {
    Store.onChange(this.updateState)
  },

  componentWillUnmount() {
    Store.offChange(this.updateState)
  },

  componentDidUpdate() {
    this.autoScroll()
  },

  autoScroll() {
    var node = document.getElementById("messages")
    node.scrollTop = node.scrollHeight
  },

  form() {
    return this.state.loggedIn ? this.messageForm() : this.loginForm()
  },

  login(e) {
    e.preventDefault()
    var username = this.refs.username.getDOMNode().value.trim()

    Actions.login(username)
    Store.set("loggedIn", true)
  },

  loginForm() {
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
  },

  sendMessage(e) {
    e.preventDefault()
    var message = this.refs.message.getDOMNode().value.trim()

    Actions.newMessage(message)
    this.refs.message.getDOMNode().value = ""
  },

  messageForm() {
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
  },

  messages() {
    return this.state.messages.map(function(mes, i) {
      return <Message key={mes.id} username={mes.username} body={mes.body} />
    })
  },

  render() {
    return (
      <div>
        <h3>Chat area</h3>
        <div id="messages">
          {this.messages()}
          {this.form()}
        </div>
      </div>
    )
  }
})

module.exports = Chat
