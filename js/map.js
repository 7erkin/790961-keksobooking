'use strict';

/*
task1Function - создаёт массив объявлений с рандомными параметрами
task2Function - убирает у заданного класса заданную метку (врЕменная функция)
task3Function - создает из массива объявлений массив из ДОМ элементов (массив для меток на карте)
task4Function - добавляет массив из ДОМ элементов (меток на карте) в разметку. Затем отображает
task5Function - создаёт и отображает развернутую информацию по какому то одному объявлению
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
var randomGenerator = {
  modeGenerator: {
    hard: true,
    soft: false
  },
  getRandomValue: function (minValue, maxValue, mode) {
    var randomValue = maxValue - (maxValue - 1 - minValue) * Math.random();
    return mode ? Math.round(randomValue) : Math.floor(randomValue);
  }
};

var getFeatures = function () {
  var features = [];
  var genMode = randomGenerator.modeGenerator;
  var howManyFeatures = randomGenerator.getRandomValue(0, FEATURES.length, genMode.soft);
  var temp = randomGenerator.getRandomValue(0, FEATURES.length, genMode.soft);
  for (var i = 0; i < howManyFeatures; ++i) {
    features.push(FEATURES[(temp + i) % FEATURES.length]);
  }
  return features;
};

var task1Function = function (adsQuantity) {
  var ads = [];
  var genMode = randomGenerator.modeGenerator;
  for (var i = 0; i < adsQuantity; ++i) {
    var ad = {};
    ad.author = {};
    ad.author.avatar = 'img/avatars/user0' + (i + 1) + '.png';
    ad.offer = {};
    var offer = ad.offer;
    offer.title = TITLE[randomGenerator.getRandomValue(0, TITLE.length, genMode.soft)];
    offer.address = randomGenerator.getRandomValue(MIN_X_LOCATION, MAX_X_LOCATION, genMode.hard) + ', ' + randomGenerator.getRandomValue(MIN_Y_LOCATION, MAX_Y_LOCATION, genMode.hard);
    offer.price = randomGenerator.getRandomValue(MIN_PRICE, MAX_PRICE, genMode.hard);
    offer.type = Object.keys(TYPE)[randomGenerator.getRandomValue(0, TYPE.length, genMode.soft)];
    offer.rooms = randomGenerator.getRandomValue(MIN_ROOMS, MAX_ROOMS, genMode.hard);
    offer.guests = randomGenerator.getRandomValue(MIN_GUESTS, MAX_GUESTS, genMode.hard);
    offer.checkin = CHECKPOINT[randomGenerator.getRandomValue(0, CHECKPOINT.length, genMode.soft)];
    offer.checkout = CHECKPOINT[randomGenerator.getRandomValue(0, CHECKPOINT.length, genMode.soft)];
    offer.features = getFeatures();
    offer.description = ' ';
    offer.photos = [
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
    ];
    ad.location = {};
    ad.location.x = randomGenerator.getRandomValue(MIN_X_LOCATION, MAX_X_LOCATION, genMode.hard);
    ad.location.y = randomGenerator.getRandomValue(MIN_Y_LOCATION, MAX_Y_LOCATION, genMode.hard);
    ads.push(ad);
  }
  return ads;
};

// task-2
var task2Function = function () {
  document.querySelector('.map').classList.remove('map--faded');
};

// task-3
var getIconsGeometry = function (iconDomElement) {
  var iconGeometry = {
    x: iconDomElement.width,
    y: iconDomElement.height
  };
  return iconGeometry;
};

var task3Function = function (ads) {
  var template = document.querySelector('template').content.querySelector('.map__pin');
  var points = [];
  // get icons geometry parameters
  var icon = document.querySelector('template').content.querySelector('.map__pin').querySelector('img');
  var iconGeometry = getIconsGeometry(icon);
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
var task4Function = function (points) {
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

var task5Function = function (ad) {
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
var ads = task1Function(ADS_QUANTITY);
task2Function();
var points = task3Function(ads);
task4Function(points);
task5Function(ads[0]);
