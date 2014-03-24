var form = document.getElementsByTagName('form')[0],
    results = document.getElementById('results'),
    addEvent,
    printResult;

addEvent = function (elm, event, callback) {
  if (elm.addEventListener) {
    elm.addEventListener(event, callback, false);
  } else {
    elm.attachEvent(event, callback);
  }
};

printResult = function (result) {
  var resultsTxt = document.createTextNode(result);
  results.innerHTML = "";
  results.appendChild(resultsTxt);
};

addEvent(form, 'change', function (e) {
  var target = (e.target) ? e.target : e.srcElement;

  if (target.type.toLowerCase() === 'radio') {
    printResult("Change called on radio with id of " + target.id);
  }
});
