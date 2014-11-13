/**
 * All action types go in here.
 *
 * keyMirror replaces `null` with the string value of the key.
 * This provides a clean way to have unique keys for a given set
 * of constants.
 */

var keyMirror = require('react/lib/keyMirror')

var Actions = keyMirror({
  LOGIN       : null,
  NEW_MESSAGE : null
})

module.exports = Actions
