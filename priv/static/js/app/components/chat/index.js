var React       = require("react")
var Message     = require("./message")
var MessageForm = require("./message_form")
var LoginForm   = require("./login_form")
var Store       = require("../../stores/chat")
var Actions     = require("../../actions/chat")

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

  messages() {
    return this.state.messages.map(function(mes, i) {
      return <Message key={mes.id} username={mes.username} body={mes.body} />
    })
  },

  form() {
    return this.state.loggedIn ? <MessageForm /> : <LoginForm />
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
