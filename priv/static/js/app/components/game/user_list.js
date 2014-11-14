var React = require("react")
var User  = require("./user")

var UserList = React.createClass({
  users() {
    return this.props.users.map(function(user, i) {
      return <User key={user.id} username={user.username} />
    })
  },

  render() {
    return (
      <div id="users">
        <h4>Users present ({this.props.users.length}):</h4>
        <ul>
          {this.users()}
        </ul>
      </div>
    )
  }
})

module.exports = UserList
