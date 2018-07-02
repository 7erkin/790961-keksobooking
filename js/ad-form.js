// Модуль, описывающий взаимодействие полей в форме подачи объявлений

'use strict';

(function () {
  var addressField = document.querySelector('#address');
  var onTimeChanged = function (evt) {
    evt.stopPropagation();
    window.adFormLibrary.changeTime(evt.target.value);
  };
  var onTypeAppartmentChanged = function (evt) {
    window.adFormLibrary.changePrice(evt.target.value);
  };
  var onRoomNumberChanged = function (evt) {
    window.adFormLibrary.setAvailableQuantityGuests(evt.target.value);
  };

  /**
   * Функция является обработчиком события на сброс формы. Событие сброс формы отменяется и сброс формы выполняется вручную
   * в соответствии с требованиями ТЗ. Обработчик события генерирует пользовталельское событие, которое перехватывается в map.js
   * @param {Event} evt
   */
  var onResetClicked = function () {
    window.adFormLibrary.genDisactivePageEvent();
  };

  var onSubmitClicked = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    window.notice.deleteNotices();
    var data = window.adFormLibrary.getDataSend();
    window.backend.publishAd(data, onPublished, onConnectionError);
  };
  var onPublished = function (evt) {
    var xhr = evt.target;
    switch (xhr.status) {
      case window.objects.StatusCode.SUCCESS:
        window.adFormLibrary.showSuccessSendInfo();
        break;
      default:
        window.library.renderErrorMessage(window.objects.ErrorMessage.ERROR_PUBLISH);
        break;
    }
  };
  var onConnectionError = function () {
    window.library.renderErrorMessage(window.objects.ErrorMessage.ERROR_PUBLISH);
  };
  var onInvalidInput = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    window.notice.updateNotices();
    window.validateInput(evt.target);
  };
  var addListenersToAdForm = function () {
    window.library.addListenerTo('#type', 'change', onTypeAppartmentChanged);
    window.library.addListenerTo('#timein', 'change', onTimeChanged);
    window.library.addListenerTo('#timeout', 'change', onTimeChanged);
    window.library.addListenerTo('#room_number', 'change', onRoomNumberChanged);
    window.library.addListenerTo('.ad-form', 'reset', onResetClicked);
    window.library.addListenerTo('.ad-form', 'submit', onSubmitClicked);
    window.library.addListenerTo('#title', 'invalid', onInvalidInput);
    window.library.addListenerTo('#price', 'invalid', onInvalidInput);
    addListenersToCheckboxes();
  };
  var addListenersToCheckboxes = function () {
    var elements = document.querySelectorAll('input[type="checkbox"]');
    Array.prototype.forEach.call(elements, function (element) {
      element.addEventListener('keydown', function (evt) {
        if (evt.keyCode !== window.objects.KeyCode.ENTER_CODE) {
          return;
        }
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        var elementCheckbox = evt.target;
        if (window.library.isElementChecked(elementCheckbox)) {
          window.library.uncheckedElement(elementCheckbox);
        } else {
          window.library.checkedElement(elementCheckbox);
        }
      });
    });
  };

  window.adForm = {};
  window.adForm.setFormDisabled = function () {
    window.adFormLibrary.disableForm();
    window.adForm.formAvailable = false;
    window.adFormLibrary.resetCheckboxes();
  };
  window.adForm.setFormEnable = function () {
    window.adFormLibrary.enableForm();
    window.adForm.formAvailable = true;
  };
  window.adForm.setAddressField = function (x, y) {
    addressField.value = x + ', ' + y;
  };
  window.adForm.resetFields = function () {
    var adForm = document.querySelector('.ad-form');
    adForm.reset();
  };
  window.adForm.formAvailable = false;

  addListenersToAdForm();

})();
