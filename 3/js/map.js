'use strict';

/*
task1 - создаёт массив объявлений с рандомными параметрами
task2 - убирает у заданного класса заданную метку (врЕменная функция)
task3 - создает из массива объявлений массив из ДОМ элементов (массив для меток на карте)
task4 - добавляет массив из ДОМ элементов (меток на карте) в разметку. Затем отображает
task5 - создаёт и отображает развернутую информацию по какому то одному объявлению
setAppartmentsPhotos - добавляет шаблон внутри шаблона. Добавляемый шаблон формируется из набора тегов описывающих фото апартаментов
*/

// task-1
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
var TYPE = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var CHECKPOINT = [
  '12:00',
  '13:00',
  '14:00'
];
var MAX_ROOMS = 5;
var MIN_ROOMS = 1;
var MIN_GUESTS = 1;
var MAX_GUESTS = 10;
var MIN_X_LOCATION = 300;
var MAX_X_LOCATION = 900;
var MIN_Y_LOCATION = 130;
var MAX_Y_LOCATION = 630;
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var getRandomValue = function (minValue, maxValue) {
  var randomValue = maxValue - (maxValue - 1 - minValue) * Math.random();
  return Math.round(randomValue);
};

var getRandomArrayElement = function (array) {
  var maxValue = array.length - 1;
  return array[getRandomValue(0, maxValue)];
};

var getFeatures = function () {
  var features = [];
  var maxValue = FEATURES.length - 1;
  var howManyFeatures = getRandomValue(0, maxValue);
  var temp = getRandomValue(0, maxValue);
  for (var i = 0; i < howManyFeatures; ++i) {
    features.push(FEATURES[(temp + i) % FEATURES.length]);
  }
  return features;
};

var Ad = function (index) {
  this.author = {};
  this.author.avatar = 'img/avatars/user0' + (index + 1) + '.png';
  this.offer = {};
  var offer = this.offer;
  offer.title = getRandomArrayElement(TITLE);
  offer.address = getRandomValue(MIN_X_LOCATION, MAX_X_LOCATION) + ', ' + getRandomValue(MIN_Y_LOCATION, MAX_Y_LOCATION);
  offer.price = getRandomValue(MIN_PRICE, MAX_PRICE);
  offer.type = getRandomArrayElement(Object.keys(TYPE));
  offer.rooms = getRandomValue(MIN_ROOMS, MAX_ROOMS);
  offer.guests = getRandomValue(MIN_GUESTS, MAX_GUESTS);
  offer.checkin = getRandomArrayElement(CHECKPOINT);
  offer.checkout = getRandomArrayElement(CHECKPOINT);
  offer.features = getFeatures();
  offer.description = ' ';
  offer.photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  this.location = {};
  this.location.x = getRandomValue(MIN_X_LOCATION, MAX_X_LOCATION);
  this.location.y = getRandomValue(MIN_Y_LOCATION, MAX_Y_LOCATION);
};

var createAds = function (adsQuantity) {
  var ads = [];
  for (var i = 0; i < adsQuantity; ++i) {
    var ad = new Ad(i);
    ads.push(ad);
  }
  return ads;
};

// task-2
var renderBlockMap = function () {
  document.querySelector('.map').classList.remove('map--faded');
};

// task-3
var getIconGeometry = function (iconDomElement) {
  var iconGeometry = {
    x: iconDomElement.width,
    y: iconDomElement.height
  };
  return iconGeometry;
};

var createPointElements = function (ads) {
  var template = document.querySelector('template').content.querySelector('.map__pin');
  var points = [];
  // get icons geometry parameters
  var icon = document.querySelector('template').content.querySelector('.map__pin').querySelector('img');
  var iconGeometry = getIconGeometry(icon);
  for (var i = 0; i < ADS_QUANTITY; ++i) {
    points[i] = template.cloneNode(true);
    var xCoorLocation = ads[i].location.x - parseInt(iconGeometry.x, 10) / 2;
    var yCoorLocation = ads[i].location.y - parseInt(iconGeometry.y, 10);
    points[i].style = 'left: ' + xCoorLocation + 'px; top: ' + yCoorLocation + 'px';
    points[i].querySelector('img').src = ads[i].author.avatar;
    points[i].querySelector('img').alt = ads[i].author.title;
  }
  return points;
};

// task-4
var renderPointsBlock = function (points) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < points.length; ++i) {
    fragment.appendChild(points[i]);
  }
  var container = document.querySelector('.map__pins');
  container.appendChild(fragment);
};

// task-5
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

var renderAd = function (ad) {
  var templateCard = document.querySelector('template').content.querySelector('.map__card');
  var templatePhoto = document.querySelector('template').content.querySelector('.popup__photo');
  var card = templateCard.cloneNode(true);
  card.querySelector('.popup__title').textContent = ad.offer.title;
  card.querySelector('.popup__text--address').textContent = ad.offer.address;
  card.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  card.querySelector('.popup__type').textContent = ad.offer.title;
  card.querySelector('.popup__text--capacity').textContent = TYPE[ad.offer.title];
  card.querySelector('.popup__text--time').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  card.querySelector('.popup__features').textContent = ad.offer.features;
  card.querySelector('.popup__text--time').textContent = 'Заезд после' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  setAppartmentsPhotoes(card, templatePhoto, ad.offer.photos);
  var container = document.querySelector('.map');
  var nextSiblingElement = container.querySelector('.map__filters-container');
  container.insertBefore(card, nextSiblingElement);
};

// использование
var ads = createAds(ADS_QUANTITY);
renderBlockMap();
var points = createPointElements(ads);
renderPointsBlock(points);
renderAd(ads[0]);
