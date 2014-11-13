var BaseStore = require("./base")
var merge     = require("react/lib/merge")
var Immutable = require("immutable")
var roomInfo  = require("../shared/room_info")

var _data = Immutable.Map({
  messages : roomInfo.messages,
  loggedIn : false
})

var ChatStore = merge(BaseStore, {
  data: _data,

  add_user(user) {
    this._user_activity(user, "entered")
  },

  remove_user(user) {
    this._user_activity(user, "left")
  },

  add_message(message) {
    this.add("messages", message)
  },

  _user_activity(user, activity) {
    this.add_message({username: user.username, body: activity})
  }
})

module.exports = ChatStore
