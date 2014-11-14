var BaseStore = require("./base")
var merge     = require("react/lib/merge")
var Immutable = require("immutable")
var roomInfo  = require("../shared/room_info")

var _data = Immutable.Map({
  users  : roomInfo.users,
  active : roomInfo.active
})

var GameStore = merge(BaseStore, {
  data: _data,

  activateGame() {
    this.set("active", true)
  },

  add_user(user) {
    this.add("users", user)
  },

  remove_user(user) {
    this.remove("users", user)
  }
})

module.exports = GameStore
