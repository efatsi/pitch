var Dispatcher = require("../dispatcher")
var Actions    = require("../shared/actions")

var ChatActions = {
  login(username) {
    Dispatcher.dispatch({type: Actions.LOGIN, username})
  },

  newMessage(body) {
    Dispatcher.dispatch({type: Actions.NEW_MESSAGE, body})
  }
}

module.exports = ChatActions
