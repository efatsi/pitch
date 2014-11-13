var React = require("react")

var User = React.createClass({
  render() {
    return (
      <li>
        {this.props.username}
      </li>
    )
  }
})

module.exports = User
