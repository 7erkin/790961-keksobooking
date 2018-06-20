'use strict';

(function () {
  var formAvailable = false;
  /**
   * @description по атрибуту узла, определяет индекс объявления из массива объявлений
   * @param {HTMLElement} element элемент ДОМа
   * @returns индекс объявления в массиве
   */

  var getNumberAd = function (element) {
    return element.dataset.adId;
  };
  var getIconGeometry = function () {
    var icon = document.querySelector('template').content.querySelector('.map__pin').querySelector('img');
    return {
      width: icon.width,
      height: icon.height
    };
  };
  var iconGeometry = getIconGeometry();
  var renderMap = function () {
    var element = document.querySelector('.map');
    window.library.removeClassFromElement(element, 'map--faded');
  };
  var renderPoints = function (points) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < points.length; ++i) {
      fragment.appendChild(points[i]);
    }
    var container = document.querySelector('.map__pins');
    container.appendChild(fragment);
  };
  var renderAd = function (ad) {
    var templateCard = document.querySelector('template').content.querySelector('.map__card');
    var templatePhoto = document.querySelector('template').content.querySelector('.popup__photo');
    var card = templateCard.cloneNode(true);
    card.querySelector('.popup__avatar').src = ad.author.avatar;
    card.querySelector('.popup__title').textContent = ad.offer.title;
    card.querySelector('.popup__text--address').textContent = ad.offer.address;
    card.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = ad.offer.title;
    card.querySelector('.popup__text--capacity').textContent = window.objects.TYPE[ad.offer.title];
    card.querySelector('.popup__text--time').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    card.querySelector('.popup__features').textContent = ad.offer.features;
    card.querySelector('.popup__text--time').textContent = 'Заезд после' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    setAppartmentsPhotoes(card, templatePhoto, ad.offer.photos);
    var container = document.querySelector('.map');
    var nextSiblingElement = container.querySelector('.map__filters-container');
    container.insertBefore(card, nextSiblingElement);
    window.library.addListenerTo('.popup__close', 'click', onCloseAdClicked);
    window.library.addListenerToDocument('keydown', onCloseAdClicked);
  };
  var renderAdForm = function () {
    var elementForm = document.querySelector('.ad-form');
    window.library.removeClassFromElement(elementForm, 'ad-form--disabled');
  };
  var hideAdForm = function () {
    var elementForm = document.querySelector('.ad-form');
    elementForm.classList.add('ad-form--disabled');
  };
  var hideMap = function () {
    window.library.addClassToElement(document.querySelector('.map'), 'map--faded');
  };
  var openAd = function (element) {
    var index = getNumberAd(element);
    renderAd(window.dataMock.ads[index]);
    window.library.addListenerToDocument('keydown', onCloseAdClicked);
  };
  var closeAd = function () {
    var container = document.querySelector('.map');
    var card = container.querySelector('.map__card');
    if (card !== null) {
      container.removeChild(card);
      window.library.removeListenerFromDocument('keydown', onCloseAdClicked);
    }
  };
  /**
 * @description устанавливаем обработчик на своё событие с именем resetPageCondition
 */
  var setCustomHandlerResetOnDocument = function () {
    window.library.addListenerToDocument('resetPageCondition', onResetPageConditionGenerated);
  };
  var setHandlerOnMainpin = function () {
    window.library.addListenerTo('.map__pin--main', 'mouseup', onMainpinMouseup);
  };
  var setHandlerOnPoints = function () {
    window.library.addListenerTo('.map__pins', 'click', onPointClicked);
  };
  var deleteHandlerOnMainpin = function () {
    window.library.removeListenerFrom('.map__pin--main', 'mouseup', onMainpinMouseup);
  };
  var deleteHandlerOnMappins = function () {
    window.library.removeListenerFrom('.map__pins', 'click', onPointClicked);
  };

  var onMainpinMouseup = function () {
    if (formAvailable) {
      return;
    }
    setMainPageActive();
  };
  var onPointClicked = function (evt) {
    if (!(evt.keyCode === 13 || evt.keyCode === undefined)) {
      return;
    }
    closeAd();
    openAd(evt.target);
    evt.stopPropagation();
  };
  var onCloseAdClicked = function (evt) {
    if (evt.keyCode === 13 || evt.keyCode === 27 || evt.keyCode === undefined) {
      closeAd();
    }
  };
  var onResetPageConditionGenerated = function () {
    setMainPageNotActive();
  };

  var setAppartmentsPhotoes = function (card, templatePhoto, photos) {
    if (!photos.length) {
      return;
    }
    var photoDiv = card.querySelector('.popup__photos');
    photoDiv.removeChild(photoDiv.querySelector('.popup__photo'));
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; ++i) {
      var photo = templatePhoto.cloneNode(true);
      photo.src = photos[i];
      fragment.appendChild(photo);
    }
    photoDiv.appendChild(fragment);
  };
  var setMainPageActive = function () {
    deleteHandlerOnMainpin();
    setHandlerOnPoints();
    renderMap();
    renderAdForm();
    window.adForm.setFormAvailable();
    renderPoints(points);
    formAvailable = true;
  };
  var setMainPageNotActive = function () {
    closeAd();
    window.adForm.resetFields();
    window.mainPinCoords.setMainPinBaseLocation();
    deleteHandlerOnMappins();
    setHandlerOnMainpin();
    hideAdForm();
    hideMap();
    deletePointsBlock();
    window.adForm.setFormDisabled();
    formAvailable = false;
  };
  /**
   * @description устанавливаем начальное значение страницы при загрузке
   */
  var setInitialPageCondition = function () {
    window.adForm.setFormDisabled();
    window.mainPinCoords.setMainPinBaseLocation();
    setHandlerOnMainpin();
  };

  var createPointElements = function (ads) {
    var template = document.querySelector('template').content.querySelector('.map__pin');
    var points = [];
    for (var i = 0; i < ads.length; ++i) {
      points[i] = template.cloneNode(true);
      var xCoorLocation = ads[i].location.x - parseInt(iconGeometry.width, 10) / 2;
      var yCoorLocation = ads[i].location.y - parseInt(iconGeometry.height, 10);
      points[i].style = 'left: ' + xCoorLocation + 'px; top: ' + yCoorLocation + 'px';
      points[i].querySelector('img').src = ads[i].author.avatar;
      points[i].querySelector('img').alt = ads[i].author.title;
      points[i].setAttribute('data-ad-id', i);
      points[i].setAttribute('data-ad-button', i);
      points[i].querySelector('img').setAttribute('data-ad-id', i); // !!!
    }
    return points;
  };
  var deletePointsBlock = function () {
    var container = document.querySelector('.map__pins');
    var elementsCards = container.querySelectorAll('[data-ad-button]');
    for (var i = 0; i < elementsCards.length; ++i) {
      elementsCards[i].remove();
    }
  };

  setCustomHandlerResetOnDocument();
  setInitialPageCondition();
  var points = createPointElements(window.dataMock.ads);
})();
