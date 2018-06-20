'use strict';
(function () {
  /**
  * @description Возвращает инпуты формы для регистрации нового объявления
  * @return {NodeList}
  */
  var getFormInputs = function () {
    var elementForm = document.querySelector('.ad-form');
    var fieldsets = elementForm.querySelectorAll('input');
    return fieldsets;
  };
  /**
   * @description Отображает сообщение об успешной регистрации объявления и устанавливает обработчики для закрытия этого сообщения
   */
  var showSuccessSendInfo = function () {
    var element = document.querySelector('.success');
    window.library.removeClassFromElement(element, 'hidden');
    window.library.addListenerToDocument('click', onCloseSuccessSendInfo);
    window.library.addListenerToDocument('keydown', onCloseSuccessSendInfo);
  };
  /**
   * @description Порождает событие reset на форме подачи объявления.
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
  /**
   * @description Отображаем предупреждения ля каждого неверно заполненного инпута
   * @param {[]} checkResult checkResult это массив объектов, каждый элемент которого состоит из неверно заполненного инпута и сообщения,
   * которое нужно отобразить для корректного ввода значения в поле.
   */
  var setNotice = function (checkResult) {
    checkResult.forEach(function (arrElement) {
      var field = arrElement.field;
      var notice = arrElement.notice;
      field.setCustomValidity(notice);
    });
  };
  /**
   * @description Создаёт строку ограничений, согласно которым записанная информация в инпут является невалидной
   * @param {HTMLElement} element инпут, введенное значение в котором оказалось невалидным
   * @return строка ограничений для инпута
   */

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
  /**
   * @description проверяет корректность заполнения каждого инпута формы
   * @param {[]} elements массив инпутов формы
   * @returns массив объектов, каждый из которых состоит из невалидного поля и строки ограничений, согласно которым инпут невалиден
   */

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

  window.doAdFormValidation = function (evt) {
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
})();
