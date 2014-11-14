/**
 * A basic Store. Sits in front of an immutable Map
 * and allows for the managing properties.
 */

var Events = require("events")
var merge  = require("react/lib/merge")

var CHANGE = "change"

var BaseStore = merge(Events.EventEmitter.prototype, {
  /**
   * Returns the entire object as a JS object
   */
  snapshot() {
    return this.data.toJS()
  },

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
    return typeof key === "string" ? this.data.get(key) : this.data.toJS()
  },

  /**
   * Sets a given set of properties. If given an object, merge it into the Map.
   * Otherwise set a given PROP string key to a given VALUE.
   *
   * Emits CHANGE event
   */
  set(prop, value) {
    this.data = typeof prop === "object" ? this.data.merge(prop) : this.data.set(prop, value)
    this.emit(CHANGE)
  },

  add(prop, value) {
    this.set(prop, this.get(prop).concat([value]))
  },

  remove(prop, value) {
    newSet = this.get(prop).filter(function(item) {
      return !(item.id == value.id)
    })

    this.set(prop, newSet)
  }
})

module.exports = BaseStore
