var BaseStore = require("./base")
var merge     = require("react/lib/merge")
var Immutable = require("immutable")
var roomInfo  = require("../shared/room_info")

var _data = Immutable.Map({
  users     : roomInfo.users,
  userCount : roomInfo.users.length
})

var GameStore = merge(BaseStore, {
  data: _data,

  add_user(user) {
    this.add("users", user)
    this._recountUsers()
  },

  remove_user(user) {
    this.remove("users", user)
    this._recountUsers()
  },

  _recountUsers() {
    this.set("userCount", this.get("users").length)
  }
})

module.exports = GameStore
