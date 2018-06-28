// Модуль отвечающий за валидацию формы. Определяет причину неверного заполнения поля формы

'use strict';

(function () {

  var validityTypeToNotice = {
    valueMissing: function () {
      return 'This field is must being filled';
    },
    typeMismatch: function () {
      return 'Input correct ' + this.type + '!';
    },
    tooShort: function () {
      return 'Input value is too short. Minimum length is ' + this.minLength + ' characters!';
    },
    tooLong: function () {
      return 'Input value is too long. Minimum length is ' + this.maxLength + ' characters!';
    },
    rangeUnderflow: function () {
      return 'Input value is too small. Minimum value is ' + this.min + ' roubles!';
    },
    rangeOverflow: function () {
      return 'Input value is too great. Maximum value is ' + this.max + ' roubles!';
    },
    patternMismatch: function () {
      return 'Input value mismatch with pattern!';
    }
  };
  var getErrorType = function (element) {
    var validity = element.validity;
    var type;
    for (type in validity) {
      if (validity[type] === true) {
        break;
      }
    }
    return type;
  };
  var getNotice = function (element) {
    var type = getErrorType(element);
    var notice = validityTypeToNotice[type].call(element);
    return notice;
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
