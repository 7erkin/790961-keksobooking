// Модуль предоставляющий механизмы фильтрации объявлений согласно определенным параметрам

'use strict';

(function () {
  var TIME_DELAY = 500;
  var elementsSelects = document.querySelectorAll('.map__filters > select');
  var elementsFeatures = document.querySelectorAll('.map__filters fieldset input');
  var PriceLimit = {
    low: 10000,
    high: 50000
  };
  var timerId;
  var limitParameter = {
    checkPrice: function (ad, limitValue) {
      var price = ad.offer.price;
      if (limitValue === 'low') {
        return price <= PriceLimit.low;
      }
      if (limitValue === 'high') {
        return price >= PriceLimit.high;
      }
      return (price > PriceLimit.low) && (price < PriceLimit.high);
    },
    checkType: function (ad, limitValue) {
      return ad.offer.type === limitValue;
    },
    checkGuests: function (ad, limitValue) {
      return ad.offer.guests === parseInt(limitValue, 10);
    },
    checkRooms: function (ad, limitValue) {
      return ad.offer.rooms === parseInt(limitValue, 10);
    }
  };

  var getFunctionName = function (limitName) {
    return 'check' + limitName[0].toUpperCase() + limitName.slice(1, limitName.length);
  };

  /**
   * Устанавливаем, подходит ли объявление по указанным в нём параметрам
   * @param {{}} limit ограничение
   * @param {{}} ad объявление
   * @return {boolean}
   */
  var isParameterMatch = function (limit, ad) {
    var functionName = getFunctionName(limit.name);
    return limitParameter[functionName](ad, limit.value);
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
    var changedSelects = Array.prototype.filter.call(elementsSelects, function (elementSelect) {
      return elementSelect.value !== 'any';
    });
    return changedSelects;
  };

  /**
   * Выбираем features, которые были установлены в фильтрации
   * @return {[]}
   */
  var getCheckedFeatures = function () {
    var checkedFeatures = Array.prototype.filter.call(elementsFeatures, function (elementFeature) {
      return elementFeature.checked;
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
        window.dataStorage.transformAds.splice(index, 1);
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
    window.dataStorage.transformAds = window.dataStorage.originalAds.slice();
    var limits = getLimits();
    var indexesNotMatchAds = [];
    limits.parameterLimits.forEach(function (limit) {
      window.dataStorage.transformAds.forEach(function (ad, index) {
        if (!isParameterMatch(limit, ad)) {
          indexesNotMatchAds.push(index);
        }
      });
      deleteNotMatchedAds(indexesNotMatchAds);
      indexesNotMatchAds = [];
    });
    limits.featureLimits.forEach(function (limit) {
      window.dataStorage.transformAds.forEach(function (ad, index) {
        if (!isFeatureMatch(limit, ad)) {
          indexesNotMatchAds.push(index);
        }
      });
      deleteNotMatchedAds(indexesNotMatchAds);
      indexesNotMatchAds = [];
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
    var elementCloseAd = document.querySelector('.popup__close');
    if (elementCloseAd !== null) {
      elementCloseAd.dispatchEvent(event);
    }
  };

  var onChanged = function (evt) {
    if (!(evt.keyCode === window.objects.KeyCode.ENTER || evt.keyCode === undefined)) {
      return;
    }
    genCloseAdEvent();
    clearTimeout(timerId);
    timerId = setTimeout(filterAds, TIME_DELAY);
  };

  window.library.addListenerTo('.map__filters', 'change', onChanged);
  window.library.addListenerTo('.map__features', 'check', onChanged);
  window.library.addListenerTo('.map__features', 'keyup', onChanged);
})();
