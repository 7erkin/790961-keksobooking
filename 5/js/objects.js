'use strict';

(function () {
  window.objects = {};
  window.objects.TYPE = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  window.objects.CHECKPOINT = [
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
  window.objects.MIN_PRICES_FOR_TYPES = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };
})();
