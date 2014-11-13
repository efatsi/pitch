var GameStore = require("../../stores/game")

var GameHandler = function(channel) {
  channel.on("user:entered", function(user) {
    GameStore.add_user(user)
  })

  channel.on("user:left", function(user) {
    GameStore.remove_user(user)
  })
}

module.exports = GameHandler
