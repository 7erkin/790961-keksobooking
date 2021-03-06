// Модуль отвечающий за корректное отображение ошибок заполнения формы подачи объявлений

'use strict';

(function () {
  var scrolled = false;
  var templateNotice = document.querySelector('#my-template').content.querySelector('#my-notice');

  var scrollToInvalidInput = function (cssSelector) {
    if (!scrolled) {
      scrolled = true;
      var element = document.querySelector(cssSelector);
      element.scrollIntoView();
    }
  };

  var hasNotice = function (elementInput) {
    var elementParent = elementInput.parentElement;
    var noticeNode = elementParent.querySelector('#my-notice');
    return noticeNode;
  };

  var deleteNotice = function (cssSelector) {
    var element = document.querySelector(cssSelector);
    var noticeNode = hasNotice(element);
    if (noticeNode !== null) {
      element.style.border = '';
      noticeNode.remove();
    }
  };

  var updateNotice = function (cssSelector) {
    var element = document.querySelector(cssSelector);
    if (element.validity.valid) {
      deleteNotice(cssSelector);
    } else {
      scrollToInvalidInput(cssSelector);
    }
  };

  /**
   * Получает из шаблона узел, который будет использоваться для установления предупреждения
   * @return {HTMLDivElement}
   */
  var getNoticeNode = function () {
    var noticeNode = templateNotice.cloneNode(true);
    return noticeNode;
  };

  window.notice = {};

  window.notice.set = function (elementInput, notice) {
    var noticeNode = hasNotice(elementInput);
    if (noticeNode === null) {
      elementInput.style.border = '5px solid red';
      noticeNode = getNoticeNode();
      noticeNode.innerText = notice;
      elementInput.parentElement.appendChild(noticeNode);
    } else {
      noticeNode.innerText = notice;
    }
  };

  window.notice.delete = function () {
    deleteNotice('#title');
    deleteNotice('#price');
  };

  window.notice.update = function () {
    scrolled = false;
    updateNotice('#title');
    updateNotice('#price');
  };
})();
