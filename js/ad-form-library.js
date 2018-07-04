// Модуль описывает методы для управления полями формы

'use strict';

(function () {
  var TypeApartmentToMinPrice = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };
  var EventNameToAttribute = {
    invalid: 'required',
    submit: 'method'
  };
  var elementForm = document.querySelector('.ad-form');
  var elementsFieldset = elementForm.querySelectorAll('fieldset');
  var elementSuccessMessage = document.querySelector('.success');
  var elementTimein = document.querySelector('#timein');
  var elementTimeout = document.querySelector('#timeout');
  var elementInputPrice = document.querySelector('#price');
  var elementCapacity = document.querySelector('#capacity');
  var elementsOption = elementCapacity.querySelectorAll('option');

  /**
   * Порождает событие reset на форме подачи объявления.
   * Вызывается при закрытии окна с инфой об успешной подаче объявления.
   * На это событие поставлен обработчик из файла ad-form.js c именем onResetClicked
   */
  var genResetFormEvent = function () {
    var event = new Event('reset', {bubbles: true});
    elementForm.dispatchEvent(event);
  };

  var onCloseSuccessSendInfo = function (evt) {
    if (!(evt.keyCode === window.objects.KeyCode.ESC || evt.keyCode === undefined)) {
      return;
    }
    genResetFormEvent();
    window.library.addClassToElement(elementSuccessMessage, 'hidden');
    window.library.removeListenerFromDocument('click', onCloseSuccessSendInfo);
    window.library.removeListenerFromDocument('keydown', onCloseSuccessSendInfo);
  };

  window.adFormLibrary = {};

  window.adFormLibrary.changeTime = function (nextTimeValue) {
    elementTimein.value = nextTimeValue;
    elementTimeout.value = nextTimeValue;
  };

  window.adFormLibrary.changePrice = function (typeApartment) {
    elementInputPrice.min = TypeApartmentToMinPrice[typeApartment];
    elementInputPrice.placeholder = TypeApartmentToMinPrice[typeApartment];
  };

  /**
   * Задает доступные значения инпута (количество гостей) в соответствии с типом апартаментов (инпут - тип апартаментов),
   * выбираемых пользователем
   * @param {number} value значение атрибута поля, которое выбирает пользователь (инпут - тип апартаментов)
   */
  window.adFormLibrary.setAvailableQuantityGuests = function (value) {
    if (value === '100') {
      Array.prototype.forEach.call(elementsOption, function (element) {
        if (!(element.value === '0')) {
          window.library.disableElement(element);
        } else {
          window.library.enableElement(element);
        }
      });
      elementCapacity.value = '0';
    } else {
      Array.prototype.forEach.call(elementsOption, function (element) {
        if (element.value !== '0' && parseInt(element.value, 10) <= parseInt(value, 10)) {
          window.library.enableElement(element);
        } else {
          window.library.disableElement(element);
        }
      });
      var elementCurrent = elementCapacity.querySelector('[value="' + elementCapacity.value + '"]');
      if (window.library.isElementEnable(elementCurrent)) {
        elementCapacity.value = value;
      }
    }
  };

  window.adFormLibrary.getDataSend = function () {
    var data = new FormData(elementForm);
    return data;
  };

  /**
   * Отображает сообщение об успешной регистрации объявления и устанавливает обработчики для закрытия этого сообщения
   */
  window.adFormLibrary.showSuccessSendInfo = function () {
    window.library.removeClassFromElement(elementSuccessMessage, 'hidden');
    window.library.addListenerToDocument('click', onCloseSuccessSendInfo);
    window.library.addListenerToDocument('keydown', onCloseSuccessSendInfo);
  };

  window.adFormLibrary.enableForm = function () {
    elementsFieldset.forEach(window.library.enableElement);
  };

  window.adFormLibrary.disableForm = function () {
    elementsFieldset.forEach(window.library.disableElement);
  };

  window.adFormLibrary.genDisactivePageEvent = function () {
    var event = new Event('disactive');
    document.dispatchEvent(event);
  };

  window.adFormLibrary.isProperEventTarget = function (element, eventName) {
    return element.hasAttribute(EventNameToAttribute[eventName]);
  };

  window.adFormLibrary.resetCheckboxes = function () {
    var checkedCheckboxes = document.querySelector('.ad-form__element.features').querySelectorAll('input[checked="checked"]');
    Array.prototype.forEach.call(checkedCheckboxes, function (element) {
      element.removeAttribute('checked');
    });
  };
})();
