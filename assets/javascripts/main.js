var form = document.getElementsByTagName('form')[0],
    clickEvents = document.getElementById('click-events'),
    changeEvents = document.getElementById('change-events'),
    interactionConsole = document.getElementById('interaction-console'),
    recordButton = document.getElementById('record'),
    results = {
      'mouseClick' : '',
      'arrowKey' : '',
      'enterKey' : '',
      'spaceBar' : ''
    },
    lastInteraction = false,
    clicks = false,
    changes = false,
    getId,
    addEvent,
    recordInteraction,
    recordEvent,
    printEvent;

getId = function (target) {
  if (target.nodeName.toLowerCase() === 'label') {
    return target.attributes['for'].nodeValue;
  }
  if (target.nodeName.toLowerCase() === 'input' && target.type.toLowerCase() === 'radio') {
    return target.id;
  }
  return false;
}

addEvent = function (elm, event, callback) {
  if (elm.addEventListener) {
    elm.addEventListener(event, callback, false);
  } else {
    elm.attachEvent(event, callback);
  }
};

recordInteraction = function (event) {
  var target = (event.target) ? event.target : event.srcElement,
      id = getId(target);

  if (!id) { return; }
  if (event.type === 'keydown') {
    switch (event.keyCode) {
      case 13:
        lastInteraction = 'enterKey';
        break;
      case 32:
        lastInteraction = 'spaceBar';
        break;
      case 38:
        lastInteraction = 'arrowKey';
        break;
      case 40:
        lastInteraction = 'arrowKey';
        break;
      default:
    }
  } else {
    if (event.type === 'mousedown') {
      lastInteraction = 'mouseClick';
    }
  }
  printLastInteraction();
};

printLastInteraction = function () {
  var txt = document.createTextNode('Last interaction: ' + lastInteraction);

  interactionConsole.innerHTML = '';
  interactionConsole.appendChild(txt);
};

recordEvent = function () {
  if (lastInteraction) {
    var markCell = function (event) {
      var cell = document.getElementById(lastInteraction + '-' + event),
          cellTxt = document.createTextNode('X');

      cell.innerHTML = '';
      cell.appendChild(cellTxt);
    };

    if (clicks) { 
      markCell('click');
    }
    if (changes) { 
      markCell('change');
    }
  }
};

printEvent = function (event, result) {
  var resultsTxt = document.createTextNode(result),
      console = (event === 'click') ? clickEvents : changeEvents;

  console.innerHTML = "";
  console.appendChild(resultsTxt);
};

addEvent(form, 'keydown', function (e) {
  recordInteraction(e);
});

addEvent(form, 'mousedown', function (e) {
  recordInteraction(e);
});

addEvent(form, 'change', function (e) {
  var target = (e.target) ? e.target : e.srcElement,
      id = getId(target);

  if (id) {
    changes = id;
    printEvent("change", "Change called on radio with id of " + id);
  }
});

addEvent(form, 'click', function (e) {
  var target = (e.target) ? e.target : e.srcElement,
      id = getId(target);

  if (id) {
    clicks = id;
    printEvent("click", "Click called on radio with id of " + id);
  }
});

addEvent(recordButton, 'click', function (e) {
  recordEvent();
  if (e.preventDefault) { 
    e.preventDefault();
  } else {
    e.returnValue = false; 
  }
});
