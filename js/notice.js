'use strict';

(function () {

  /**
   * Выполняет управление предупреждениями
   * @param {HTMLInputElement} elementInput
   */
  var correctNotice = function (elementInput) {
    if (elementInput.validity.valid) {
      elementInput.style.border = '';
      if (window.notice.isNoticeAlreadySet(elementInput)) {
        var elementParent = elementInput.parentElement;
        elementParent.querySelector('#my-notice').remove();
      }
    }
  };

  window.notice = {};

  /**
   * Выполняет управление предупреждениями на всех инпутах, которые могут быть неверно заполнены
   */
  window.notice.correctNotices = function () {
    correctNotice(document.querySelector('#title'));
    correctNotice(document.querySelector('#price'));
  };

  /**
   * Удаляет предупреждение у инпута независимо оттого, валиден ли сейчас инпут или нет
   * @param {HTMLInputElement} elementInput
   */
  window.notice.deleteNotice = function (elementInput) {
    elementInput.style.border = '';
    if (window.notice.isNoticeAlreadySet(elementInput)) {
      var elementParent = elementInput.parentElement;
      elementParent.querySelector('#my-notice').remove();
    }
  };

  /**
   * Проверяет, существует ли ДОМ элемент предупреждения у переданного инпута
   * @param {HTMLInputElement} elementInput
   * @return {boolean}
   */
  window.notice.isNoticeAlreadySet = function (elementInput) {
    var elementParent = elementInput.parentElement;
    var elementNotice = elementParent.querySelector('#my-notice');
    return (elementNotice === null) ? false : true;
  };
})();
