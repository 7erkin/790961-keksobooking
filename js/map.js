// Главный модуль, управляющий целой страницей

'use strict';

(function () {

  var setHandlerOnPageActive = function () {
    window.library.addListenerToDocument('active', onPageSetActive);
  };

  var setHandlerOnPageDisactive = function () {
    window.library.addListenerToDocument('disactive', onPageSetDisactive);
  };

  var deleteHandlerOnPageActive = function () {
    window.library.removeListenerFromDocument('active', onPageSetActive);
  };

  var deleteHandlerOnPageDisactive = function () {
    window.library.removeListenerFromDocument('disactive', onPageSetDisactive);
  };

  var onPageSetActive = function () {
    window.dataStorage.downloadAds();
    window.adForm.setFormEnable();
    window.mapLibrary.renderMap();
    window.mapLibrary.renderAdForm();
    window.mapHandler.deleteHandlerOnMainpin();
    window.mapHandler.setHandlerOnMappins();
    window.mapHandler.setHandlerUpdateMap();

    deleteHandlerOnPageActive();
    setHandlerOnPageDisactive();
  };

  var onPageSetDisactive = function () {
    window.adAction.close();
    window.adForm.resetFields();
    window.adForm.setFormDisabled();
    window.mapHandler.deleteHandlerOnMappins();
    window.mapHandler.deleteHandlerUpdateMap();
    window.mapHandler.setHandlerOnMainpin();
    window.mapLibrary.hideAdForm();
    window.mapLibrary.hideMap();
    window.mapLibrary.deletePoints();
    window.mapLibrary.resetNotices();
    window.mapLibrary.resetFilterForm();
    window.mapLibrary.hideFilters();
    window.loadRenderPictures.deletePhotos();
    setTimeout(window.mainPinCoords.setMainPinBaseLocation, 1);

    deleteHandlerOnPageDisactive();
    setHandlerOnPageActive();
  };

  /**
   * Устанавливает страницу в начальное состояние
   */
  var setInitialPageCondition = function () {
    window.adForm.setFormDisabled();
    window.mapLibrary.hideFilters();
    window.mapHandler.setHandlerOnMainpin();
    window.mapHandler.setCustomHandlerResetOnDocument();
    window.mainPinCoords.setMainPinBaseLocation();

    setHandlerOnPageActive();
  };

  setInitialPageCondition();
})();
