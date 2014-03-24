var form = document.getElementsByTagName('form')[0],
    results = document.getElementById('results'),
    addEvent;

addEvent = function (elm, event, callback) {
  if (elm.addEventListener) {
    elm.addEventListener(event, callback, false);
  } else {
    elm.attachEvent(event, callback);
  }
};

addEvent(form, 'change', function (e) {
  var target = (e.target) ? e.target : e.srcElement,
      resultsTxt;

  if (target.type.toLowerCase() === 'radio') {
    resultsTxt = document.createTextNode("Change called on radio with id of " + target.id);
    results.innerHTML = "";
    results.appendChild(resultsTxt);
  }
});
