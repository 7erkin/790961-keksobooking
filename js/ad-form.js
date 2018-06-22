'use strict';

(function () {
  var addressField = document.querySelector('#address');
  var changeTimeIn = function (nextTimeValue) {
    var elementTimein = document.querySelector('#timein');
    elementTimein.value = nextTimeValue;
  };
  var changeTimeOut = function (nextTimeValue) {
    var elementTimeout = document.querySelector('#timeout');
    elementTimeout.value = nextTimeValue;
  };
  var changeTime = function (nextTimeValue) {
    changeTimeIn(nextTimeValue);
    changeTimeOut(nextTimeValue);
  };
  var onTimeChanged = function (evt) {
    evt.stopPropagation();
    changeTime(evt.target.value);
  };
  var onTypeAppartmentChanged = function (evt) {
    var elementInputPrice = document.querySelector('#price');
    elementInputPrice.min = window.objects.MIN_PRICES_FOR_TYPES[evt.target.value];
    elementInputPrice.placeholder = window.objects.MIN_PRICES_FOR_TYPES[evt.target.value];
  };

  /**
   * Задает доступные значения инпута (количество гостей) в соответствии с типом апартаментов (инпут - тип апартаментов),
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
          window.library.disableElement(elementOptions[i]);
        } else {
          window.library.enableElement(elementOptions[i]);
        }
      }
      elementCapacity.value = '0';
    } else {
      for (var j = 0; j < length; ++j) {
        if (elementOptions[j].value !== '0' && parseInt(elementOptions[j].value, 10) <= parseInt(value, 10)) {
          window.library.enableElement(elementOptions[j]);
        } else {
          window.library.disableElement(elementOptions[j]);
        }
      }
      elementCapacity.value = value;
    }
  };
  var onRoomNumberChanged = function (evt) {
    setAvailableQuantityGuests(evt.target.value);
  };
  var onCapacityChanged = function (evt) {
    var elementSelected = document.querySelector('#capacity');
    elementSelected.value = evt.target.value;
    window.library.disselectElement(elementSelected);
    window.library.selectElement(evt.target);
  };

  /**
   * Функция является обработчиком события на сброс формы. Событие сброс формы отменяется и сброс формы выполняется вручную
   * в соответствии с требованиями ТЗ. Обработчик события генерирует пользовталельское событие, которое перехватывается в map.js
   * @param {Event} evt
   */
  var onResetClicked = function (evt) {
    var newEvent = new Event('resetPageCondition');
    document.dispatchEvent(newEvent);
    evt.preventDefault();
  };
  var getFormFieldsets = function () {
    var elementForm = document.querySelector('.ad-form');
    var fieldsets = elementForm.querySelectorAll('fieldset');
    return fieldsets;
  };
  var onSubmitClicked = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    window.notice.correctNotices();
    showSuccessSendInfo(); // if we can send message without any errors
  };
  var onInvalidInput = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    window.notice.correctNotices();
    window.validateInput(evt.target);
  };
  var addListenersToAdForm = function () {
    window.library.addListenerTo('#type', 'change', onTypeAppartmentChanged);
    window.library.addListenerTo('#timein', 'change', onTimeChanged);
    window.library.addListenerTo('#timeout', 'change', onTimeChanged);
    window.library.addListenerTo('#room_number', 'change', onRoomNumberChanged);
    window.library.addListenerTo('.ad-form', 'reset', onResetClicked);
    window.library.addListenerTo('.ad-form', 'submit', onSubmitClicked);
    window.library.addListenerTo('#capacity', 'change', onCapacityChanged);
    window.library.addListenerTo('#title', 'invalid', onInvalidInput);
    window.library.addListenerTo('#price', 'invalid', onInvalidInput);
  };

    /**
   * Отображает сообщение об успешной регистрации объявления и устанавливает обработчики для закрытия этого сообщения
   */
  var showSuccessSendInfo = function () {
    var element = document.querySelector('.success');
    window.library.removeClassFromElement(element, 'hidden');
    window.library.addListenerToDocument('click', onCloseSuccessSendInfo);
    window.library.addListenerToDocument('keydown', onCloseSuccessSendInfo);
  };

  /**
   * Порождает событие reset на форме подачи объявления.
   * Вызывается при закрытии окна с инфой об успешной подаче объявления.
   * На это событие поставлен обработчик из файла ad-form.js c именем onResetClicked
   */
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
    window.library.addClassToElement(element, 'hidden');
    window.library.removeListenerFromDocument('click', onCloseSuccessSendInfo);
  };

  window.adForm = {};
  window.adForm.setFormDisabled = function () {
    var fieldsets = getFormFieldsets();
    fieldsets.forEach(window.library.disableElement);
  };
  window.adForm.setFormAvailable = function () {
    var fieldsets = getFormFieldsets();
    fieldsets.forEach(window.library.enableElement);
  };
  window.adForm.setAddressField = function (x, y) {
    addressField.value = x + ', ' + y;
  };
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

  addListenersToAdForm();
})();
