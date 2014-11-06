var _       = require("underscore")
var React   = require("react")
var Message = require("./message")

var ChatApp = React.createClass({
  messages() {
    return _.map(this.props.messages, function(mes, i) {
      return <Message key={i} username={mes.username} body={mes.body} />
    })
  },

  render() {
    return (
      <div id="messages">
        <h3>Chat area</h3>
        {this.messages()}
      </div>
    )
  }
})

module.exports = ChatApp;
