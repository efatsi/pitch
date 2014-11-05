$(function(){
  var socket = new Phoenix.Socket("ws://" + location.host + "/ws");
  var height;

  var $messages = $("#messages");
  var $form     = $("#chat");
  var $username = $("#username");
  var $message  = $("#message");
  var $roomName = $("#room_info").data("name")

  var scrollToBottom = function() {
    height = $messages[0].scrollHeight;
    $messages.scrollTop(height);
  }

  scrollToBottom();

  socket.join("rooms", $roomName, {}, function(channel) {
    $form.submit(function(e) {
      e.preventDefault();

      channel.send("message:new", {username: $username.val(), body: $message.val()});
      $message.val("");
    })

    channel.on("message:new", function(message) {
      $messages.append("<br/>[" + message.username + "] " + message.body)
      scrollToBottom();
    });

    channel.on("user:entered", function(message) {
      $messages.append("<br/>someone entered")
      scrollToBottom();
    });

    channel.on("user:left", function(message) {
      $messages.append("<br/>someone left")
      scrollToBottom();
    });
  });
});
