'use strict';

(function () {
  window.adForm = {};
  window.adForm.resetFields = function () {
    var adForm = document.querySelector('.ad-form');
    var elementInputs = adForm.querySelectorAll('input');
    for (var i = 0; i < elementInputs.length; ++i) {
      if (elementInputs[i].name === 'address') {
        continue;
      }
      elementInputs[i].value = '';
    }
    var elementTextArea = adForm.querySelector('textarea');
    elementTextArea.value = '';
  };
  var addressField = document.querySelector('#address');
  var onTypeAppartmentChanged = function (evt) {
    var elementInputPrice = document.querySelector('#price');
    elementInputPrice.min = window.objects.MIN_PRICES_FOR_TYPES[evt.target.value];
    elementInputPrice.placeholder = window.objects.MIN_PRICES_FOR_TYPES[evt.target.value];
  };
  var onTimeinChanged = function (evt) {
    var elementTimeout = document.querySelector('#timeout');
    window.library.setElementNotSelected(elementTimeout.querySelector('[selected]'));
    window.library.setElementSelected(elementTimeout.querySelector('[value="' + evt.target.value + '"]'));
  };
  var onTimeoutChanged = function (evt) {
    var elementTimein = document.querySelector('#timein');
    window.library.setElementNotSelected(elementTimein.querySelector('[selected]'));
    window.library.setElementSelected(elementTimein.querySelector('[value="' + evt.target.value + '"]'));
  };
  /**
   * @description задает доступные значения инпута (количество гостей) в соответствии с типом апартаментов (инпут - тип апартаментов),
   * выбираемых пользователем
   * @param {number} value значение атрибута поля, которое выбирает пользователь (инпут - тип апартаментов)
   */
  var setAvailableQuantityGuests = function (value) {
    var elementCapacity = document.querySelector('#capacity');
    var elementOptions = elementCapacity.querySelectorAll('option');
    var length = elementOptions.length;
    if (value === '100') {
      for (var i = 0; i < length; ++i) {
        if (!(elementOptions[i].value === '0')) {
          window.library.setElementNotSelected(elementOptions[i]);
          window.library.setElementDisabled(elementOptions[i]);
        } else {
          window.library.setElementAvailable(elementOptions[i]);
          window.library.setElementSelected(elementOptions[i]);
        }
      }
    } else {
      var indexLastAvailable = 0;
      for (var j = 0; j < length; ++j) {
        if (elementOptions[j].value !== '0' && parseInt(elementOptions[j].value, 10) <= parseInt(value, 10)) {
          window.library.setElementAvailable(elementOptions[j]);
          indexLastAvailable = j;
        } else {
          window.library.setElementDisabled(elementOptions[j]);
          window.library.setElementNotSelected(elementOptions[j]);
        }
      }
      window.library.setElementSelected(elementOptions[indexLastAvailable]);
    }
  };
  var onRoomNumberChanged = function (evt) {
    setAvailableQuantityGuests(evt.target.value);
  };
  var onCapacityChanged = function (evt) {
    var elementSelected = document.querySelector('#capacity').querySelector('[selected="selected"]');
    window.library.setElementNotSelected(elementSelected);
    window.library.setElementSelected(evt.target);
  };
  var addListenersToAdForm = function () {
    window.library.addListenerTo('#type', 'change', onTypeAppartmentChanged);
    window.library.addListenerTo('#timein', 'change', onTimeinChanged);
    window.library.addListenerTo('#timeout', 'change', onTimeoutChanged);
    window.library.addListenerTo('#room_number', 'change', onRoomNumberChanged);
    window.library.addListenerTo('.ad-form', 'reset', onResetClicked);
    window.library.addListenerTo('.ad-form__submit', 'click', onSendFormClicked);
    window.library.addListenerTo('#capacity', 'change', onCapacityChanged);
  };
  /**
   * @description Функция является обработчиком события на сброс формы. Событие сброс формы отменяется и сброс формы выполняется вручную
   * в соответствии с требованиями ТЗ. Обработчик события генерирует пользовталельское событие, которое перехватывается в map.js
   * @param {Event} evt
   */
  var onResetClicked = function (evt) {
    var newEvent = new Event('resetPageCondition');
    document.dispatchEvent(newEvent);
    evt.preventDefault();
  };
  window.adForm.setFormDisabled = function () {
    var fieldsets = getFormFieldsets();
    fieldsets.forEach(window.library.setElementDisabled);
  };
  window.adForm.setFormAvailable = function () {
    var fieldsets = getFormFieldsets();
    fieldsets.forEach(window.library.setElementAvailable);
  };
  var getFormFieldsets = function () {
    var elementForm = document.querySelector('.ad-form');
    var fieldsets = elementForm.querySelectorAll('fieldset');
    return fieldsets;
  };
  window.adForm.setAddressField = function (x, y) {
    addressField.value = x + ', ' + y;
  };
  var onSendFormClicked = function (evt) {
    window.doAdFormValidation(evt);
  };
  addListenersToAdForm();
})();
