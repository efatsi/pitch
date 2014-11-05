$(function(){
  var socket = new Phoenix.Socket("ws://" + location.host + "/ws");
  var height;

  var $messages     = $("#messages");
  var $roomName     = $("#room_info").data("name")

  var $usernameForm = $("#username-form");
  var $username     = $("#username");
  var $messageForm  = $("#message-form");
  var $message      = $("#message");

  var scrollToBottom = function() {
    height = $messages[0].scrollHeight;
    $messages.scrollTop(height);
  }

  scrollToBottom();

  socket.join("rooms", $roomName, {}, function(channel) {
    $usernameForm.submit(function(e) {
      e.preventDefault();
      var token = Math.random().toString(36).substr(8);

      channel.send("user:new", {username: $username.val(), token: token});

      $usernameForm.hide();
      $messageForm.show();
    })

    $messageForm.submit(function(e) {
      e.preventDefault();

      channel.send("message:new", {body: $message.val()});
      $message.val("");
    })

    channel.on("message:new", function(message) {
      $messages.append("<br/>[" + message.username + "] " + message.body)
      scrollToBottom();
    });

    channel.on("user:entered", function(message) {
      $messages.append("<br/>[" + message.username + "] entered")
      scrollToBottom();
    });

    channel.on("user:left", function(message) {
      $messages.append("<br/>[" + message.username + "] left")
      scrollToBottom();
    });
  });
});
