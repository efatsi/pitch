module.exports = function() {
  var $messages = $("#messages");

  height = $messages[0].scrollHeight;
  $messages.scrollTop(height);
}
