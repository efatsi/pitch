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

  /**
   * Add an element to an array property
   */
  add(prop, value) {
    ChatStore.set(prop, ChatStore.get(prop).concat([value]))
  }
})

module.exports = ChatStore
