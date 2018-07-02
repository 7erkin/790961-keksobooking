// Модуль описывает методы для работы с элементами на карте

'use strict';

(function () {
  var QUANTITY_POINTS_ON_MAP = 5;
  var getPointLocation = function (ad) {
    return {
      x: ad.location.x - parseInt(iconGeometry.width, 10) / 2,
      y: ad.location.y - parseInt(iconGeometry.height, 10)
    };
  };
  var getIconGeometry = function () {
    var icon = document.querySelector('template').content.querySelector('.map__pin').querySelector('img');
    return {
      width: icon.width,
      height: icon.height
    };
  };
  var iconGeometry = getIconGeometry();
  var resetFilterCheckboxes = function () {
    var elements = document.querySelector('#housing-features').querySelectorAll('input[checked="checked"]');
    Array.prototype.forEach.call(elements, function (element) {
      element.removeAttribute('checked');
    });
  };

  window.mapLibrary = {};
  window.mapLibrary.renderAdForm = function () {
    var elementForm = document.querySelector('.ad-form');
    window.library.removeClassFromElement(elementForm, 'ad-form--disabled');
  };
  window.mapLibrary.renderFilters = function () {
    var elementFilter = document.querySelector('.map__filters-container');
    window.library.removeClassFromElement(elementFilter, 'hidden');
  };
  window.mapLibrary.renderMap = function () {
    var element = document.querySelector('.map');
    window.library.removeClassFromElement(element, 'map--faded');
  };
  window.mapLibrary.renderPoints = function (points) {
    var fragment = document.createDocumentFragment();
    points.forEach(function (element) {
      fragment.appendChild(element);
    });
    var container = document.querySelector('.map__pins');
    container.appendChild(fragment);
  };

  window.mapLibrary.hideAdForm = function () {
    var elementForm = document.querySelector('.ad-form');
    elementForm.classList.add('ad-form--disabled');
  };
  window.mapLibrary.hideMap = function () {
    window.library.addClassToElement(document.querySelector('.map'), 'map--faded');
  };
  window.mapLibrary.hideFilters = function () {
    var elementFilter = document.querySelector('.map__filters-container');
    window.library.addClassToElement(elementFilter, 'hidden');
    resetFilterCheckboxes();
  };

  window.mapLibrary.createPointElements = function () {
    var points = [];
    var template = document.querySelector('template').content.querySelector('.map__pin');
    window.dataStorage.adsTransform.slice(0, QUANTITY_POINTS_ON_MAP).forEach(function (element, index) {
      var point = template.cloneNode(true);
      var pointLocation = getPointLocation(element);
      point.style = 'left: ' + pointLocation.x + 'px; top: ' + pointLocation.y + 'px';
      point.querySelector('img').src = element.author.avatar;
      point.querySelector('img').alt = element.author.title;
      point.setAttribute('data-ad-id', index);
      point.setAttribute('data-ad-button', index);
      point.querySelector('img').setAttribute('data-ad-id', index); // !!!
      points.push(point);
    });
    return points;
  };
  window.mapLibrary.deletePoints = function () {
    var container = document.querySelector('.map__pins');
    var elementsCards = container.querySelectorAll('[data-ad-button]');
    Array.prototype.forEach.call(elementsCards, function (element) {
      element.remove();
    });
  };
  window.mapLibrary.updatePointsOnMap = function () {
    window.mapLibrary.deletePoints();
    var points = window.mapLibrary.createPointElements();
    window.mapLibrary.renderPoints(points);
  };

  window.mapLibrary.resetFilterForm = function () {
    document.querySelector('.map__filters').reset();
  };
  window.mapLibrary.resetNotices = function () {
    window.notice.deleteNotices();
  };
})();
