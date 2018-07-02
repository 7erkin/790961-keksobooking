// Модуль отвечающий за валидацию формы. Определяет причину неверного заполнения поля формы

'use strict';

(function () {

  var validityTypeToNotice = {
    getValueMissingNotice: function () {
      return 'This field is must being filled';
    },
    getTypeMismatchNotice: function () {
      return 'Input correct ' + this.type + '!';
    },
    getTooShortNotice: function () {
      return 'Input value is too short. Minimum length is ' + this.minLength + ' characters!';
    },
    getTooLongNotice: function () {
      return 'Input value is too long. Minimum length is ' + this.maxLength + ' characters!';
    },
    getRangeUnderflowNotice: function () {
      return 'Input value is too small. Minimum value is ' + this.min + ' roubles!';
    },
    getRangeOverflowNotice: function () {
      return 'Input value is too great. Maximum value is ' + this.max + ' roubles!';
    },
    getPatternMismatchNotice: function () {
      return 'Input value mismatch with pattern!';
    }
  };
  var getErrorTypeName = function (element) {
    var validity = element.validity;
    var type;
    for (type in validity) {
      if (validity[type] === true) {
        break;
      }
    }
    return type;
  };
  var getFunctionName = function (typeName) {
    return 'get' + typeName[0].toUpperCase() + typeName.slice(1, typeName.length) + 'Notice';
  };
  var getNotice = function (element) {
    var typeName = getErrorTypeName(element);
    var functionName = getFunctionName(typeName);
    var notice = validityTypeToNotice[functionName].call(element);
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
