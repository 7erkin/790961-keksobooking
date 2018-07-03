'use strict';

(function () {
  window.objects = {};
  window.objects.TypeApartment = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  window.objects.CHECKPOINTS = [
    '12:00',
    '13:00',
    '14:00'
  ];
  window.objects.FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  window.objects.MinPriceTypeApartment = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };
  window.objects.StatusCode = {
    SUCCESS: 200,
    CACHED: 302,
    NOT_FOUND_ERROR: 404,
    SERVER_ERROR: 500
  };
  window.objects.KeyCode = {
    ESC: 27,
    ENTER: 13
  };
  window.objects.ErrorMessage = {
    DOWNLOAD: 'не удалось загрузить объявления',
    PUBLISH: 'не удалось опубликовать объявление'
  };
})();
