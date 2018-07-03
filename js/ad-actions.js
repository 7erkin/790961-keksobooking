// Модуль обеспечивает отображение и закрытие карточки объявления

'use strict';

(function () {
  var ApartamentType = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var template = document.querySelector('template');
  var templateCard = template.content.querySelector('.map__card');
  var templatePhoto = template.content.querySelector('.popup__photo');
  var elementContainer = document.querySelector('.map');

  var setApartmentPhotos = function (card, photos) {
    if (!photos.length) {
      return;
    }
    var photoDiv = card.querySelector('.popup__photos');
    photoDiv.removeChild(photoDiv.querySelector('.popup__photo'));
    var fragment = document.createDocumentFragment();
    photos.forEach(function (element) {
      var photo = templatePhoto.cloneNode(true);
      photo.src = element;
      fragment.appendChild(photo);
    });
    photoDiv.appendChild(fragment);
  };

  var getNumberAd = function (element) {
    return element.dataset.adId;
  };

  var onCloseAdClicked = function (evt) {
    if (evt.keyCode === window.objects.KeyCode.ENTER || evt.keyCode === window.objects.KeyCode.ESC || evt.keyCode === undefined) {
      window.adAction.close();
    }
  };

  window.adAction = {};

  window.adAction.render = function (ad) {
    var card = templateCard.cloneNode(true);
    card.querySelector('.popup__avatar').src = ad.author.avatar;
    card.querySelector('.popup__title').textContent = ad.offer.title;
    card.querySelector('.popup__text--address').textContent = ad.offer.address;
    card.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = ad.offer.title;
    card.querySelector('.popup__text--capacity').textContent = ApartamentType[ad.offer.title];
    card.querySelector('.popup__text--time').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    card.querySelector('.popup__features').textContent = ad.offer.features;
    card.querySelector('.popup__text--time').textContent = 'Заезд после' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    setApartmentPhotos(card, ad.offer.photos);
    var nextSiblingElement = elementContainer.querySelector('.map__filters-container');
    elementContainer.insertBefore(card, nextSiblingElement);
    window.library.addListenerTo('.popup__close', 'click', onCloseAdClicked);
    window.library.addListenerToDocument('keydown', onCloseAdClicked);
  };

  window.adAction.open = function (element) {
    var index = getNumberAd(element);
    window.adAction.render(window.dataStorage.adsTransform[index]);
    window.library.addListenerToDocument('keydown', onCloseAdClicked);
  };

  window.adAction.close = function () {
    var card = elementContainer.querySelector('.map__card');
    if (card !== null) {
      elementContainer.removeChild(card);
      window.library.removeListenerFromDocument('keydown', onCloseAdClicked);
    }
  };
})();
