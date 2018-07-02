// Модуль обеспечивает отображение и закрытие карточки объявления

'use strict';

(function () {
  var template = document.querySelector('template');

  var setApartmentPhotoes = function (card, templatePhoto, photos) {
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

  window.adAction = {};
  window.adAction.renderAd = function (ad) {
    var templateCard = template.content.querySelector('.map__card');
    var templatePhoto = template.content.querySelector('.popup__photo');
    var card = templateCard.cloneNode(true);
    card.querySelector('.popup__avatar').src = ad.author.avatar;
    card.querySelector('.popup__title').textContent = ad.offer.title;
    card.querySelector('.popup__text--address').textContent = ad.offer.address;
    card.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = ad.offer.title;
    card.querySelector('.popup__text--capacity').textContent = window.objects.TypeApartment[ad.offer.title];
    card.querySelector('.popup__text--time').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    card.querySelector('.popup__features').textContent = ad.offer.features;
    card.querySelector('.popup__text--time').textContent = 'Заезд после' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    setApartmentPhotoes(card, templatePhoto, ad.offer.photos);
    var container = document.querySelector('.map');
    var nextSiblingElement = container.querySelector('.map__filters-container');
    container.insertBefore(card, nextSiblingElement);
    window.library.addListenerTo('.popup__close', 'click', onCloseAdClicked);
    window.library.addListenerToDocument('keydown', onCloseAdClicked);
  };
  window.adAction.openAd = function (element) {
    var index = getNumberAd(element);
    window.adAction.renderAd(window.dataStorage.adsTransform[index]);
    window.library.addListenerToDocument('keydown', onCloseAdClicked);
  };
  window.adAction.closeAd = function () {
    var container = document.querySelector('.map');
    var card = container.querySelector('.map__card');
    if (card !== null) {
      container.removeChild(card);
      window.library.removeListenerFromDocument('keydown', onCloseAdClicked);
    }
  };
  var onCloseAdClicked = function (evt) {
    if (evt.keyCode === window.objects.KeyCode.ENTER || evt.keyCode === window.objects.KeyCode.ESC || evt.keyCode === undefined) {
      window.adAction.closeAd();
    }
  };
})();
