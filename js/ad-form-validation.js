'use strict';

(function () {

  /**
   * Создаёт строку ограничений, согласно которым записанная информация в инпут является невалидной
   * @param {HTMLElement} element инпут, введенное значение в котором оказалось невалидным
   * @return {string} строка ограничений для инпута
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
    if (validity.rangeUnderflow === true) {
      notices.push('Input value is too small. Minimum value is ' + element.min + ' roubles!');
    }
    if (validity.rangeOverflow === true) {
      notices.push('Input value is too great. Maximum value is ' + element.max + ' roubles!');
    }
    if (validity.patternMismatch === true) {
      notices.push('Input value mismatch with pattern!');
    }
    return notices.join('; ');
  };

  /**
   * Добавляет узел предупреждения к невалидному инпуту
   * @param {HTMLInputElement} elementInput
   * @param {string} notice
   */

  window.validateInput = function (elementInput) {
    var notice = getNotice(elementInput);
    window.notice.setNotice(elementInput, notice);
  };
})();
