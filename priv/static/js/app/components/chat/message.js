var React = require("react")

var Message = React.createClass({
  render() {
    return (
      <div className="message">
        [{this.props.username}] {this.props.body}
      </div>
    )
  }
})

module.exports = Message
