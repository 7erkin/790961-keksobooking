// Модуль описывает методы для управления полями формы

'use strict';

(function () {
  var eventNameToAttribute = {
    invalid: 'required',
    submit: 'method'
  };
  var changeTimeIn = function (nextTimeValue) {
    var elementTimein = document.querySelector('#timein');
    elementTimein.value = nextTimeValue;
  };
  var changeTimeOut = function (nextTimeValue) {
    var elementTimeout = document.querySelector('#timeout');
    elementTimeout.value = nextTimeValue;
  };

  /**
   * Порождает событие reset на форме подачи объявления.
   * Вызывается при закрытии окна с инфой об успешной подаче объявления.
   * На это событие поставлен обработчик из файла ad-form.js c именем onResetClicked
   */
  var genResetFormEvent = function () {
    var event = new Event('reset', {bubbles: true});
    document.querySelector('.ad-form').dispatchEvent(event);
  };
  var onCloseSuccessSendInfo = function (evt) {
    var element = document.querySelector('.success');
    if (!(evt.keyCode === window.objects.KeyCode.ESC || evt.keyCode === undefined)) {
      return;
    }
    genResetFormEvent();
    window.library.addClassToElement(element, 'hidden');
    window.library.removeListenerFromDocument('click', onCloseSuccessSendInfo);
  };
  var getFormFieldsets = function () {
    var elementForm = document.querySelector('.ad-form');
    var fieldsets = elementForm.querySelectorAll('fieldset');
    return fieldsets;
  };

  window.adFormLibrary = {};
  window.adFormLibrary.changeTime = function (nextTimeValue) {
    changeTimeIn(nextTimeValue);
    changeTimeOut(nextTimeValue);
  };
  window.adFormLibrary.changePrice = function (price) {
    var elementInputPrice = document.querySelector('#price');
    elementInputPrice.min = window.objects.MinPriceTypeApartment[price];
    elementInputPrice.placeholder = window.objects.MinPriceTypeApartment[price];
  };

  /**
   * Задает доступные значения инпута (количество гостей) в соответствии с типом апартаментов (инпут - тип апартаментов),
   * выбираемых пользователем
   * @param {number} value значение атрибута поля, которое выбирает пользователь (инпут - тип апартаментов)
   */
  window.adFormLibrary.setAvailableQuantityGuests = function (value) {
    var elementCapacity = document.querySelector('#capacity');
    var elementOptions = elementCapacity.querySelectorAll('option');
    if (value === '100') {
      Array.prototype.forEach.call(elementOptions, function (element) {
        if (!(element.value === '0')) {
          window.library.disableElement(element);
        } else {
          window.library.enableElement(element);
        }
      });
      elementCapacity.value = '0';
    } else {
      Array.prototype.forEach.call(elementOptions, function (element) {
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
    var elementForm = document.querySelector('.ad-form');
    var data = new FormData(elementForm);
    return data;
  };

  /**
   * Отображает сообщение об успешной регистрации объявления и устанавливает обработчики для закрытия этого сообщения
   */
  window.adFormLibrary.showSuccessSendInfo = function () {
    var element = document.querySelector('.success');
    window.library.removeClassFromElement(element, 'hidden');
    window.library.addListenerToDocument('click', onCloseSuccessSendInfo);
    window.library.addListenerToDocument('keydown', onCloseSuccessSendInfo);
  };
  window.adFormLibrary.enableForm = function () {
    var fieldsets = getFormFieldsets();
    fieldsets.forEach(window.library.enableElement);
  };
  window.adFormLibrary.disableForm = function () {
    var fieldsets = getFormFieldsets();
    fieldsets.forEach(window.library.disableElement);
  };
  window.adFormLibrary.genDisactivePageEvent = function () {
    var event = new Event('disactive');
    document.dispatchEvent(event);
  };
  window.adFormLibrary.isProperEventTarget = function (element, eventName) {
    return element.hasAttribute(eventNameToAttribute[eventName]);
  };
  window.adFormLibrary.resetCheckboxes = function () {
    var elements = document.querySelector('.ad-form__element.features').querySelectorAll('input[checked="checked"]');
    Array.prototype.forEach.call(elements, function (element) {
      element.removeAttribute('checked');
    });
  };
})();
