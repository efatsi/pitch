var roomInfo = document.getElementById("room_info")

module.exports = {
  name     : roomInfo.getAttribute("data-name"),
  active   : roomInfo.getAttribute("data-active") == "true",
  messages : JSON.parse(roomInfo.getAttribute("data-messages")),
  users    : JSON.parse(roomInfo.getAttribute("data-users")),
}
