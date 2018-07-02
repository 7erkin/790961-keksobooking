// Модуль предоставляет интерфейс для управлением установкой и снятием обработчиков событий на элементы

'use strict';

(function () {

  var onUpdateMap = function () {
    window.mapLibrary.updatePointsOnMap();
  };
  var onMainpinMouseup = function () {
    if (window.adForm.formAvailable) {
      return;
    }
    genPageActive();
  };
  var onPointClicked = function (evt) {
    if (evt.target.dataset.adId === undefined) {
      return;
    }
    if (!(evt.keyCode === window.objects.KeyCode.ENTER || evt.keyCode === undefined)) {
      return;
    }
    window.adAction.closeAd();
    window.adAction.openAd(evt.target);
    evt.stopPropagation();
  };

  var onResetPageConditionGenerated = function () {
    genPageDisactive();
  };
  var genPageActive = function () {
    var event = new Event('active');
    document.dispatchEvent(event);
  };
  var genPageDisactive = function () {
    var event = new Event('disactive');
    document.dispatchEvent(event);
  };

  window.mapHandler = {};
  window.mapHandler.setCustomHandlerResetOnDocument = function () {
    window.library.addListenerToDocument('resetPageCondition', onResetPageConditionGenerated);
  };
  window.mapHandler.setHandlerOnMainpin = function () {
    window.library.addListenerTo('.map__pin--main', 'mouseup', onMainpinMouseup);
  };
  window.mapHandler.setHandlerOnMappins = function () {
    window.library.addListenerTo('.map__pins', 'click', onPointClicked);
  };
  window.mapHandler.setHandlerUpdateMap = function () {
    window.library.addListenerToDocument('update', onUpdateMap);
  };
  window.mapHandler.deleteHandlerOnMainpin = function () {
    window.library.removeListenerFrom('.map__pin--main', 'mouseup', onMainpinMouseup);
  };
  window.mapHandler.deleteHandlerOnMappins = function () {
    window.library.removeListenerFrom('.map__pins', 'click', onPointClicked);
  };
  window.mapHandler.deleteHandlerUpdateMap = function () {
    window.library.removeListenerFromDocument('update', onUpdateMap);
  };
})();
