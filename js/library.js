// Модуль, содержащий общеиспользуемые среди множества модулей функции

'use strict';

(function () {
  var ERROR_HEADER = 'Ошибка соединения: ';
  var currentTimerId;

  var getErrorMessage = function () {
    return document.querySelector('#my-network-error');
  };

  var closeErrorMessage = function () {
    var elementErrorMessage = document.querySelector('#my-network-error');
    elementErrorMessage.remove();
  };

  var getErrorMessageNode = function () {
    return document.querySelector('#my-template').content.querySelector('#my-network-error');
  };

  window.library = {};

  window.library.renderErrorMessage = function (error) {
    var elementErrorMessage = getErrorMessage();
    if (elementErrorMessage === null) {
      var templateErrorMessageNode = getErrorMessageNode();
      var node = templateErrorMessageNode.cloneNode(true);
      node.innerText = ERROR_HEADER + error;
      document.body.appendChild(node);
    } else {
      clearTimeout(currentTimerId);
      elementErrorMessage.innerText = ERROR_HEADER + error;
    }
    currentTimerId = setTimeout(closeErrorMessage, 500);
  };

  window.library.uncheckElement = function (element) {
    element.removeAttribute('checked');
  };

  window.library.checkElement = function (element) {
    element.setAttribute('checked', 'checked');
  };

  window.library.isElementChecked = function (element) {
    return element.hasAttribute('checked');
  };

  window.library.enableElement = function (element) {
    element.removeAttribute('disabled');
  };

  window.library.disableElement = function (element) {
    element.setAttribute('disabled', 'disabled');
  };

  window.library.selectElement = function (element) {
    element.setAttribute('selected', 'selected');
  };

  window.library.disselectElement = function (element) {
    element.removeAttribute('selected');
  };

  window.library.getRandomValue = function (minValue, maxValue) {
    var randomValue = maxValue - (maxValue - 1 - minValue) * Math.random();
    return Math.round(randomValue);
  };

  window.library.getRandomArrayElement = function (array) {
    var maxValue = array.length - 1;
    return array[window.library.getRandomValue(0, maxValue)];
  };

  window.library.getRandomArrayElements = function (array, quantity) {
    var temp = [];
    for (var i = 0; i < quantity; ++i) {
      temp.push(window.library.getRandomArrayElement(array));
    }
    return temp;
  };

  window.library.shuffle = function (array) {
    for (var i = array.length - 1; i > 0; --i) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[j];
      array[j] = array[i];
      array[i] = temp;
    }
    return array;
  };

  window.library.addListenerTo = function (cssSelector, eventName, eventListener) {
    document.querySelector(cssSelector).addEventListener(eventName, eventListener);
  };

  window.library.removeListenerFrom = function (cssSelector, eventName, eventListener) {
    document.querySelector(cssSelector).removeEventListener(eventName, eventListener);
  };

  window.library.addListenerToDocument = function (eventName, eventListener) {
    document.addEventListener(eventName, eventListener);
  };

  window.library.removeListenerFromDocument = function (eventName, eventListener) {
    document.removeEventListener(eventName, eventListener);
  };

  window.library.addClassToElement = function (element, className) {
    element.classList.add(className);
  };

  window.library.removeClassFromElement = function (element, className) {
    element.classList.remove(className);
  };

  window.library.isElementEnable = function (element) {
    return element.hasAttribute('disabled');
  };

  window.library.getElementLocation = function (element) {
    return {
      left: parseFloat(element.style.left, 10),
      top: parseFloat(element.style.top, 10)
    };
  };
})();
