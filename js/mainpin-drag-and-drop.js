'use strict';

(function () {
  var genMouseUp = function () {
    var event = new Event('mouseup');
    document.dispatchEvent(event);
  };

  var nextCoords = {};

  var onMouseDown = function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (mouseEvt) {
      evt.preventDefault();
      var shift = getShift(mouseEvt);
      changeMainPinCoords(shift);
      changeStartCoords(mouseEvt);
    };
    var onMouseUp = function () {
      window.library.removeListenerFromDocument('mousemove', onMouseMove);
      window.library.removeListenerFromDocument('mouseup', onMouseUp);
    };
    window.library.addListenerToDocument('mousemove', onMouseMove);
    window.library.addListenerToDocument('mouseup', onMouseUp);
    var getShift = function (mouseEvt) {
      return {
        x: startCoords.x - mouseEvt.clientX,
        y: startCoords.y - mouseEvt.clientY
      };
    };
    var changeStartCoords = function (mouseEvt) {
      startCoords.x = mouseEvt.clientX;
      startCoords.y = mouseEvt.clientY;
    };
  };

  var changeMainPinCoords = function (shift) {
    nextCoords.x = window.mainPinCoords.getMainPinCoordX() - shift.x;
    nextCoords.y = window.mainPinCoords.getMainPinCoordY() - shift.y;
    if (!window.mainPinCoords.isMoveAvailable(nextCoords.x, nextCoords.y)) {
      genMouseUp();
      return;
    }
    window.mainPinCoords.setMainPinCoords(nextCoords.x, nextCoords.y);
    var addressCoords = window.mainPinCoords.calculateAddress(nextCoords.x, nextCoords.y);
    window.adForm.setAddressField(addressCoords.x, addressCoords.y);
  };

  window.library.addListenerTo('.map__pin--main', 'mousedown', onMouseDown);
})();
