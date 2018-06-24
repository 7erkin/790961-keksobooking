'use strict';

(function () {
  var elementMainPin = document.querySelector('.map__pin--main');
  var smallShift = 15;
  var PIN_WIDTH = elementMainPin.offsetWidth;
  var PIN_HEIGHT = elementMainPin.offsetHeight;
  var MAX_Y = 630;
  var MIN_Y = 130;
  var MAX_X = document.querySelector('.map').offsetWidth;
  var MIN_X = 0;
  var baseMainPinCoords = {
    x: elementMainPin.offsetLeft,
    y: elementMainPin.offsetTop
  };
  var isMoveXAvailable = function (nextCoordX) {
    return (nextCoordX + PIN_WIDTH / 2 <= MIN_X || nextCoordX + PIN_WIDTH / 2 >= MAX_X) ? false : true;
  };
  var isMoveYAvailable = function (nextCoordY) {
    return (nextCoordY + PIN_HEIGHT + smallShift <= MIN_Y || nextCoordY + PIN_HEIGHT + smallShift >= MAX_Y) ? false : true;
  };

  window.mainPinCoords = {};
  window.mainPinCoords.getMainPinCoordX = function () {
    return elementMainPin.offsetLeft;
  };
  window.mainPinCoords.getMainPinCoordY = function () {
    return elementMainPin.offsetTop;
  };
  window.mainPinCoords.setMainPinCoords = function (coordX, coordY) {
    elementMainPin.style.left = coordX + 'px';
    elementMainPin.style.top = coordY + 'px';
  };

  /**
   * Функция проверяет, доступно ли перемещение главной метки на координаты nextCoordX, nextCoordY
   * согласно установленным ограничениям
   * @param {number} nextCoordX
   * @param {number} nextCoordY
   * @return {boolean} возврат значения булева типа
   */
  window.mainPinCoords.isMoveAvailable = function (nextCoordX, nextCoordY) {
    return isMoveXAvailable(nextCoordX) && isMoveYAvailable(nextCoordY);
  };

  /**
   * Функция устанавливает главную метку в начальное положение. Также заполняем поле адреса в форме подачи объявлений
   */
  window.mainPinCoords.setMainPinBaseLocation = function () {
    window.mainPinCoords.setMainPinCoords(baseMainPinCoords.x, baseMainPinCoords.y);
    var addressCoords = window.mainPinCoords.calculateAddress(baseMainPinCoords.x, baseMainPinCoords.y);
    window.adForm.setAddressField(addressCoords.x, addressCoords.y);
  };

  /**
   *  Функция считает координаты объявления на карте, с учетом размера главной метки
   * @param {number} currentCoordX координата метки по оси Х
   * @param {number} currentCoordY координата метки по оси У
   * @return {object}
   */
  window.mainPinCoords.calculateAddress = function (currentCoordX, currentCoordY) {
    return {
      x: currentCoordX + PIN_WIDTH / 2,
      y: currentCoordY + PIN_HEIGHT + smallShift
    };
  };
})();
