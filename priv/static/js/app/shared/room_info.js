var roomInfo = document.getElementById("room_info")

module.exports = {
  name     : roomInfo.getAttribute("data-name"),
  messages : JSON.parse(roomInfo.getAttribute("data-messages")),
  users    : JSON.parse(roomInfo.getAttribute("data-users"))
}
