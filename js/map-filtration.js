// Модуль предоставляющий механизмы фильтрации объявлений согласно определенным параметрам

'use strict';

(function () {
  var TIME_DELAY = 500;

  var PriceLimit = {
    low: 10000,
    high: 50000
  };
  var timerId;
  var checkLimitParameter = {
    price: function (ad, limitValue) {
      var price = ad.offer.price;
      if (limitValue === 'low') {
        return (price <= PriceLimit.low) ? true : false;
      }
      if (limitValue === 'high') {
        return (price >= PriceLimit.high) ? true : false;
      }
      return (price > PriceLimit.low) && (price < PriceLimit.high);
    },
    type: function (ad, limitValue) {
      return ad.offer.type === limitValue;
    },
    guests: function (ad, limitValue) {
      return ad.offer.guests === parseInt(limitValue, 10);
    },
    rooms: function (ad, limitValue) {
      return ad.offer.rooms === parseInt(limitValue, 10);
    }
  };

  /**
   * Устанавливаем, подходит ли объявление по указанным в нём параметрам
   * @param {{}} limit ограничение
   * @param {{}} ad объявление
   * @return {boolean}
   */
  var isParameterMatch = function (limit, ad) {
    return checkLimitParameter[limit.name](ad, limit.value);
  };
  var isFeatureMatch = function (limit, ad) {
    return (ad.offer.features.indexOf(limit.name) === -1) ? false : true;
  };

  /**
   * Получаем параметры фильтрации, установленные пользователем
   * @return {{}} объект из двух массивов объектов
   */
  var getLimits = function () {
    var limits = {};
    limits.parameterLimits = [];
    var changedSelects = getChangedSelects();
    changedSelects.forEach(function (selectElement) {
      var name = selectElement.name.split('-')[1];
      limits.parameterLimits.push({
        name: name,
        value: selectElement.value
      });
    });
    limits.featureLimits = [];
    var checkedFeatures = getCheckedFeatures();
    checkedFeatures.forEach(function (featureElement) {
      limits.featureLimits.push({
        name: featureElement.value
      });
    });
    return limits;
  };

  /**
   * Выбираес поля, которые были установлены в фильтрации
   * @return {[]}
   */
  var getChangedSelects = function () {
    var selects = document.querySelectorAll('.map__filters > select');
    var changedSelects = Array.prototype.filter.call(selects, function (select) {
      return select.value !== 'any';
    });
    return changedSelects;
  };

  /**
   * Выбираем features, которые были установлены в фильтрации
   * @return {[]}
   */
  var getCheckedFeatures = function () {
    var features = document.querySelectorAll('.map__filters fieldset input');
    var checkedFeatures = Array.prototype.filter.call(features, function (feature) {
      return feature.checked === true;
    });
    return checkedFeatures;
  };

  /**
   * Удаляет не прошедшие фильтрацию объявления объявления по индексу
   * @param {[]} indexes
   */
  var deleteNotMatchedAds = function (indexes) {
    indexes.
      sort(function (left, right) {
        return right - left;
      }).
      forEach(function (index) {
        window.dataStorage.adsTransform.splice(index, 1);
      });
  };

  /**
   * Функция осуществляющая фильтрацию объявлений по заданным фильтрам.
   * 1. Копирую оригинальные объявления в массив объявлений для фильтрации
   * 2. Получаю объект массивов объектов, который содержит информацию о параметрах фильтрации
   * 3. Для каждого ограничения, установленного через select, нахожу индексы элементов, которые не проходят фильтр
   * 4. Удаляю элементы по индексам
   * 5. Пункты 3 и 4 повторяю для ограничений на features
   * 6. Генерирую событие перерисовки карты с метками объявлений. Отрисуются только отфильтрованные объвления
   */
  var filterAds = function () {
    window.dataStorage.adsTransform = window.dataStorage.adsOrigin.slice();
    var limits = getLimits();
    var indexNotMatchedAds = [];
    limits.parameterLimits.forEach(function (limit) {
      window.dataStorage.adsTransform.forEach(function (ad, index) {
        if (!isParameterMatch(limit, ad)) {
          indexNotMatchedAds.push(index);
        }
      });
      deleteNotMatchedAds(indexNotMatchedAds);
      indexNotMatchedAds = [];
    });
    limits.featureLimits.forEach(function (limit) {
      window.dataStorage.adsTransform.forEach(function (ad, index) {
        if (!isFeatureMatch(limit, ad)) {
          indexNotMatchedAds.push(index);
        }
      });
      deleteNotMatchedAds(indexNotMatchedAds);
      indexNotMatchedAds = [];
    });
    genMapRenderingEvent();
  };

  /**
   * Функция генерации события, которое инициирует перерисовку меток объявлений на карте
   */
  var genMapRenderingEvent = function () {
    var event = new Event('update');
    document.dispatchEvent(event);
  };

  /**
   * Функция генерации события, которое инициирует закрытие карточки объявления, при использовании фильтров
   */
  var genCloseAdEvent = function () {
    var event = new Event('click');
    var element = document.querySelector('.popup__close');
    if (element !== null) {
      element.dispatchEvent(event);
    }
  };

  var onChanged = function () {
    genCloseAdEvent();
    clearTimeout(timerId);
    timerId = setTimeout(filterAds, TIME_DELAY);
  };

  window.library.addListenerTo('.map__filters', 'change', onChanged);
  window.library.addListenerTo('.map__features', 'check', onChanged);
})();
