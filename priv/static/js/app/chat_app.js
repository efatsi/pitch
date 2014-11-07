var _            = require("underscore");
var React        = require("react");
var Message      = require("./message");
var EventHandler = require("./event_handler.js");

var ChatApp = React.createClass({
  getInitialState() {
    return {loggedIn: false};
  },

  componentDidMount() {
    EventHandler.addListener("chat", this.newEvent);
    this.autoScroll();
  },

  componentWillUnmount() {
    EventHandler.removeListener("chat", this.newEvent);
  },

  componentDidUpdate() {
    console.log("component updated");
    this.autoScroll();
  },

  newEvent(message) {
    this.props.messages.push(message);
    this.forceUpdate();
  },

  autoScroll() {
    var node = document.getElementById("messages");
    node.scrollTop = node.scrollHeight;
  },

  form() {
    return this.state.loggedIn ? this.messageForm() : this.loginForm();
  },

  login(e) {
    e.preventDefault();
    var username = this.refs.username.getDOMNode().value.trim();

    EventHandler.login(username);
    this.setState({loggedIn: true});
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
    );
  },

  sendMessage(e) {
    e.preventDefault();
    var message = this.refs.message.getDOMNode().value.trim();

    EventHandler.sendMessage(message);
    this.refs.message.getDOMNode().value = "";
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
    );
  },

  messages() {
    return _.map(this.props.messages, function(mes, i) {
      return <Message key={i} username={mes.username} body={mes.body} />
    });
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
    );
  }
})

module.exports = ChatApp;
