/**
 * A single store example. ChatStore sits in front of an immutable Map
 * and allows for the increasing of a counter value.
 */

var Events    = require("events")
var merge     = require("react/lib/merge")
var Immutable = require("immutable")
var roomInfo  = require("../shared/room_info")

var _data  = Immutable.Map({
  messages : roomInfo.messages,
  users    : roomInfo.users,
  loggedIn : false
})

var CHANGE = "change"

var ChatStore = merge(Events.EventEmitter.prototype, {
  /**
   * Adds an event listener to subscribe to data changes
   */
  onChange(callback) {
    this.on(CHANGE, callback)
  },

  /**
   * Removes an event listener on data changes
   */
  offChange(callback) {
    this.removeListener(CHANGE, callback)
  },

  /**
   * Returns properties. If given a string KEY, returns the specific value.
   * Otherwise it returns the entire object as JS.
   */
  get(key) {
    return typeof key === "string" ? _data.get(key) : _data.toJS()
  },

  /**
   * Sets a given set of properties. If given an object, merge it into the Map.
   * Otherwise set a given PROP string key to a given VALUE.
   *
   * Triggers Bus.publish()
   */
  set(prop, value) {
    _data = typeof prop === "object" ? _data.merge(prop) : _data.set(prop, value)
    ChatStore.emit(CHANGE)
  },

  add_user(user) {
    this._add("users", user)
    this.add_message({username: user.username, body: "entered"})
  },

  remove_user(user) {
    var users = this.get("users")
    this.set("users", users.splice(users.indexOf(user), 1))
    this.add_message({username: user.username, body: "left"})
  },

  add_message(message) {
    this._add("messages", message)
  },

  _add(prop, value) {
    this.set(prop, this.get(prop).concat([value]))
  }
})

module.exports = ChatStore
