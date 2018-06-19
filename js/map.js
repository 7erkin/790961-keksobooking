'use strict';

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
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var getIconGeometry = function () {
  var icon = document.querySelector('template').content.querySelector('.map__pin').querySelector('img');
  return {
    width: icon.width,
    height: icon.height
  };
};
var iconGeometry = getIconGeometry();
var formAvailable = false;
var shuffle = function (array) {
  for (var i = array.length - 1; i > 0; --i) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
};
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
  offer.photos = shuffle(PHOTOS.slice());
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
var renderBlockMap = function () {
  var element = document.querySelector('.map');
  removeClassFromElement(element, 'map--faded');
};
var createPointElements = function (ads) {
  var template = document.querySelector('template').content.querySelector('.map__pin');
  var points = [];
  for (var i = 0; i < ADS_QUANTITY; ++i) {
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
var renderPointsBlock = function (points) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < points.length; ++i) {
    fragment.appendChild(points[i]);
  }
  var container = document.querySelector('.map__pins');
  container.appendChild(fragment);
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
var renderAd = function (ad) {
  var templateCard = document.querySelector('template').content.querySelector('.map__card');
  var templatePhoto = document.querySelector('template').content.querySelector('.popup__photo');
  var card = templateCard.cloneNode(true);
  card.querySelector('.popup__avatar').src = ad.author.avatar;
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
  addListenerTo('.popup__close', 'click', onCloseAdClicked);
  addListenerToDocument('keydown', onCloseAdClicked);
};

// ========== module4-task1 ==========

// getFormFieldsets - возвращает массив элементов формы для заполнения объявления
// getNumberAd - позволяет соотнести, путем установления номера, элемент из массива объявлений с элементом из ДОМ дерева
// setFormDisabled - устанавливает элементы формы в неактивный режим
// setFormAvailable - устанавливает элементы формы в активный режим
// setElementAvailable - устанавливает элемент в активный режим
// setElementDisabled - устанавливает элемент в неактивный режим
// setPageCondition - устанавливает начальное состояние страницы
// renderAdForm - делает форму доступной
// openAd - открывает карточку объявления
// closeAd - закрывает карточку объявления
// setInitialAddressField - заполняет начальное положение главной метки в поле адрес
// onCloseAdClicked - обработчик закрытия карточки объявления
// onPointClicked - обработчик нажатия по метке объявления
// onMainpinMouseup - обработчик нажатия на начальную заставку главной метки

var getFormFieldsets = function () {
  var elementForm = document.querySelector('.ad-form');
  var fieldsets = elementForm.querySelectorAll('fieldset');
  return fieldsets; // раньше выбрасывал массив
};
var getNumberAd = function (element) {
  return element.dataset.adId;
};
var setFormDisabled = function () {
  var fieldsets = getFormFieldsets();
  fieldsets.forEach(setElementDisabled);
};
var setFormAvailable = function () {
  var fieldsets = getFormFieldsets();
  fieldsets.forEach(setElementAvailable);
};
var setElementAvailable = function (element) {
  element.removeAttribute('disabled');
};
var setElementDisabled = function (element) {
  element.setAttribute('disabled', 'disabled');
};
var setInitialPageCondition = function () {
  setFormDisabled();
  setHandlerOnMainpin();
};
var setHandlerOnMainpin = function () {
  addListenerTo('.map__pin--main', 'mouseup', onMainpinMouseup);
};
var setHandlerOnPoints = function () {
  addListenerTo('.map__pins', 'click', onPointClicked);
};
var deleteHandlerOnMainpin = function () {
  removeListenerFrom('.map__pin--main', 'mouseup', onMainpinMouseup);
};
var deleteHandlerOnMappins = function () {
  removeListenerFrom('.map__pins', 'click', onPointClicked);
};
var renderAdForm = function () {
  var elementForm = document.querySelector('.ad-form');
  removeClassFromElement(elementForm, 'ad-form--disabled');
};
var setMainPageActive = function () {
  deleteHandlerOnMainpin();
  setHandlerOnPoints();
  renderBlockMap();
  renderAdForm();
  setFormAvailable();
  renderPointsBlock(points);
  setInitialAddressField();
  formAvailable = true;
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
var openAd = function (element) {
  var index = getNumberAd(element);
  renderAd(ads[index]);
  addListenerToDocument('keydown', onCloseAdClicked);
};
var closeAd = function () {
  var container = document.querySelector('.map');
  var card = container.querySelector('.map__card');
  if (card !== null) {
    container.removeChild(card);
    removeListenerFromDocument('keydown', onCloseAdClicked);
  }
};
var onCloseAdClicked = function (evt) {
  if (evt.keyCode === 13 || evt.keyCode === 27 || evt.keyCode === undefined) {
    closeAd();
  }
};
var setInitialAddressField = function () {
  // получить координаты метки
  var elementMainpin = document.querySelector('.map__pin--main');
  var pinLocation = getLocation(elementMainpin);
  // применить координаты метки
  var xCoor = pinLocation.left;
  var yCoor = pinLocation.top + iconGeometry.width / 2;
  var elementInput = document.querySelector('#address');
  elementInput.setAttribute('value', xCoor + ', ' + yCoor);
};
var getLocation = function (element) {
  return {
    left: parseFloat(element.style.left, 10),
    top: parseFloat(element.style.top, 10)
  };
};
// ========== module4-task2 ==========

var getFormInputs = function () {
  var elementForm = document.querySelector('.ad-form');
  var fieldsets = elementForm.querySelectorAll('input');
  return fieldsets; // раньше выбрасывал массив
};
var MIN_PRICES_FOR_TYPES = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalo: 0
};
var hideAdForm = function () {
  var elementForm = document.querySelector('.ad-form');
  elementForm.classList.add('ad-form--disabled');
};
var hideBlockMap = function () {
  addClassToElement(document.querySelector('.map'), 'map--faded');
};
var deletePointsBlock = function () {
  var container = document.querySelector('.map__pins');
  var elementsCards = container.querySelectorAll('[data-ad-button]');
  for (var i = 0; i < elementsCards.length; ++i) {
    elementsCards[i].remove();
  }
};
var setElementSelected = function (element) {
  element.setAttribute('selected', 'selected');
};
var setElementNotSelected = function (element) {
  element.removeAttribute('selected');
};
var onTypeAppartmentChanged = function (evt) {
  var elementInputPrice = document.querySelector('#price');
  elementInputPrice.min = MIN_PRICES_FOR_TYPES[evt.target.value];
  elementInputPrice.placeholder = MIN_PRICES_FOR_TYPES[evt.target.value];
};
var onTimeinChanged = function (evt) {
  var elementTimeout = document.querySelector('#timeout');
  setElementNotSelected(elementTimeout.querySelector('[selected]'));
  setElementSelected(elementTimeout.querySelector('[value="' + evt.target.value + '"]'));
};
var onTimeoutChanged = function (evt) {
  var elementTimein = document.querySelector('#timein');
  setElementNotSelected(elementTimein.querySelector('[selected]'));
  setElementSelected(elementTimein.querySelector('[value="' + evt.target.value + '"]'));
};
var setAvailableQuantityGuests = function (value) {
  var elementCapacity = document.querySelector('#capacity');
  var elementOptions = elementCapacity.querySelectorAll('option');
  var length = elementOptions.length;
  if (value === '100') {
    for (var i = 0; i < length; ++i) {
      if (!(elementOptions[i].value === '0')) {
        setElementNotSelected(elementOptions[i]);
        setElementDisabled(elementOptions[i]);
      } else {
        setElementAvailable(elementOptions[i]);
        setElementSelected(elementOptions[i]);
      }
    }
  } else {
    var indexLastAvailable = 0;
    for (var j = 0; j < length; ++j) {
      if (elementOptions[j].value !== '0' && elementOptions[j].value <= value) {
        setElementAvailable(elementOptions[j]);
        indexLastAvailable = j;
      } else {
        setElementDisabled(elementOptions[j]);
        setElementNotSelected(elementOptions[j]);
      }
      setElementSelected(elementOptions[indexLastAvailable]);
    }
  }
};
var onRoomNumberChanged = function (evt) {
  setAvailableQuantityGuests(evt.target.value);
};
var setMainPageNotActive = function () {
  deleteHandlerOnMappins();
  setHandlerOnMainpin();
  hideAdForm();
  hideBlockMap();
  deletePointsBlock();
  setFormDisabled();
  formAvailable = false;
};
var onResetClicked = function (evt) {
  setMainPageNotActive();
  evt.stopPropagation();
};

var setNotice = function (checkResult) {
  checkResult.forEach(function (arrElement) {
    var field = arrElement.field;
    var notice = arrElement.notice;
    field.setCustomValidity(notice);
  });
};
var getNotice = function (element) {
  var validity = element.validity;
  var notices = [];
  if (validity.valueMissing === true) {
    notices.push('This field is must being filled');
  }
  if (validity.typeMismatch === true) {
    notices.push('Input correct ' + element.type + '!');
  }
  if (validity.tooShort === true) {
    notices.push('Input value is too short. Minimum length is ' + element.minLength + ' characters!');
  }
  if (validity.tooLong === true) {
    notices.push('Input value is too long. Minimum length is ' + element.maxLength + ' characters!');
  }
  // if (validity.stepMismatch === true) { }
  if (validity.rangeUnderflow === true) {
    notices.push('Input value is too small. Minimum value is ' + element.min + ' roubles!');
  }
  if (validity.rangeOverflow === true) {
    notices.push('Input value is too great. Maximum value is ' + element.max + ' roubles!');
  }
  if (validity.patternMismatch === true) {
    notices.push('Input value mismatch with pattern!');
  }
  // if (validity.customError === true) { }
  // if (validity.badInput === true) { }
  return notices.join('; ');
};
var checkValidity = function (elements) {
  var checkResult = [];
  for (var i = 0; i < elements.length; ++i) {
    if (elements[i].validity.valid) {
      continue;
    }
    if (elements[i].validity.customError) {
      continue;
    }
    checkResult.push({
      field: elements[i],
      notice: getNotice(elements[i])
    });
  }
  return checkResult;
};
var isValid = function (checkResult) {
  return (Object.keys(checkResult).length === 0) ? true : false;
};
var onSendFormClicked = function (evt) {
  var elementsInput = getFormInputs();
  var checkResult = checkValidity(elementsInput);
  if (isValid(checkResult)) {
    showSuccessSendInfo();
    evt.preventDefault();
    evt.stopPropagation();
  } else {
    setNotice(checkResult);
  }
};
var showSuccessSendInfo = function () {
  var element = document.querySelector('.success');
  removeClassFromElement(element, 'hidden');
  addListenerToDocument('click', onCloseSuccessSendInfo);
  addListenerToDocument('keydown', onCloseSuccessSendInfo);
};
var genEventResetForm = function () {
  var event = new Event('reset', {bubbles: true});
  var elementForm = document.querySelector('.ad-form');
  elementForm.dispatchEvent(event);
};
var onCloseSuccessSendInfo = function (evt) {
  var element = document.querySelector('.success');
  if (!(evt.keyCode === 27 || evt.keyCode === undefined)) {
    return;
  }
  genEventResetForm();
  addClassToElement(element, 'hidden');
  removeListenerFromDocument('click', onCloseSuccessSendInfo);
};

//
var addListenerTo = function (cssSelector, eventName, eventListener) {
  document.querySelector(cssSelector).addEventListener(eventName, eventListener);
};
var removeListenerFrom = function (cssSelector, eventName, eventListener) {
  document.querySelector(cssSelector).removeEventListener(eventName, eventListener);
};
var addListenerToDocument = function (eventName, eventListener) {
  document.addEventListener(eventName, eventListener);
};
var removeListenerFromDocument = function (eventName, eventListener) {
  document.removeEventListener(eventName, eventListener);
};
var addClassToElement = function (element, className) {
  element.classList.add(className);
};
var removeClassFromElement = function (element, className) {
  element.classList.remove(className);
};
var addListenersToAdForm = function () {
  addListenerTo('#type', 'change', onTypeAppartmentChanged);
  addListenerTo('#timein', 'change', onTimeinChanged);
  addListenerTo('#timeout', 'change', onTimeoutChanged);
  addListenerTo('#room_number', 'change', onRoomNumberChanged);
  addListenerTo('.ad-form', 'reset', onResetClicked);
  addListenerTo('.ad-form__submit', 'click', onSendFormClicked);
};

// использование
var ads = createAds(ADS_QUANTITY);
var points = createPointElements(ads);
addListenersToAdForm();
setInitialPageCondition();
