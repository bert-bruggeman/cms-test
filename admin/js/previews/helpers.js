var renderPreview = function(name, title) {
  return h('div', {className: name + '-preview preview flex flex-center'}, h('span', {}, title));
}


var formatDate = function(dateStr) {
  var [date, time] = dateStr.split(" ");
  var [y,m,d] = date.split("-");
  var months = [ "januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december" ];
  var month = months[parseInt(m) - 1];
  return `${d} ${month} ${y}`;
}
