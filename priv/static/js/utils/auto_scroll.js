var $ = require("jquery")

module.exports = function() {
  var $messages = $("#messages");

  var height = $messages[0].scrollHeight;
  $messages.scrollTop(height);
}
