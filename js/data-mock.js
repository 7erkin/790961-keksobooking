'use strict';

(function () {
  var ADS_QUANTITY = 8;
  var TITLE = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var MAX_PRICE = 1e6;
  var MIN_PRICE = 1e3;
  var MAX_ROOMS = 5;
  var MIN_ROOMS = 1;
  var MIN_GUESTS = 1;
  var MAX_GUESTS = 10;
  var MIN_X_LOCATION = 300;
  var MAX_X_LOCATION = 900;
  var MIN_Y_LOCATION = 130;
  var MAX_Y_LOCATION = 630;
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var getFeatures = function () {
    var features = [];
    var maxValue = window.objects.FEATURES.length - 1;
    var howManyFeatures = window.library.getRandomValue(0, maxValue);
    var temp = window.library.getRandomValue(0, maxValue);
    for (var i = 0; i < howManyFeatures; ++i) {
      features.push(window.objects.FEATURES[(temp + i) % window.objects.FEATURES.length]);
    }
    return features;
  };
  var Ad = function (index) {
    this.author = {};
    this.author.avatar = 'img/avatars/user0' + (index + 1) + '.png';
    this.offer = {};
    var offer = this.offer;
    offer.title = window.library.getRandomArrayElement(TITLE);
    offer.address = window.library.getRandomValue(MIN_X_LOCATION, MAX_X_LOCATION) + ', ' + window.library.getRandomValue(MIN_Y_LOCATION, MAX_Y_LOCATION);
    offer.price = window.library.getRandomValue(MIN_PRICE, MAX_PRICE);
    offer.type = window.library.getRandomArrayElement(Object.keys(window.objects.TYPE));
    offer.rooms = window.library.getRandomValue(MIN_ROOMS, MAX_ROOMS);
    offer.guests = window.library.getRandomValue(MIN_GUESTS, MAX_GUESTS);
    offer.checkin = window.library.getRandomArrayElement(window.objects.CHECKPOINT);
    offer.checkout = window.library.getRandomArrayElement(window.objects.CHECKPOINT);
    offer.features = getFeatures();
    offer.description = ' ';
    offer.photos = window.library.shuffle(PHOTOS.slice());
    this.location = {};
    this.location.x = window.library.getRandomValue(MIN_X_LOCATION, MAX_X_LOCATION);
    this.location.y = window.library.getRandomValue(MIN_Y_LOCATION, MAX_Y_LOCATION);
  };
  var createAds = function (adsQuantity) {
    var ads = [];
    for (var i = 0; i < adsQuantity; ++i) {
      var ad = new Ad(i);
      ads.push(ad);
    }
    return ads;
  };

  window.dataMock = {};
  window.dataMock.ads = createAds(ADS_QUANTITY);
})();
