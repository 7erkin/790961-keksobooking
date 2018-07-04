// Модуль, который использует интерфейс загрузки данных по сети и хранит эти данные.
// Использует интерфейс отображения ошибки, если в процессе загрузки что то случилось

'use strict';

(function () {

  /**
   * Колбэк в случае возникновения ошибки запроса
   */
  var onConnectionError = function () {
    window.library.renderErrorMessage(window.objects.ErrorMessage.ERROR_DOWNLOAD);
  };

  /**
   * Колбэк в случае успешного выполнения запроса
   * @param {Event} evt
   */
  var onFetched = function (evt) {
    var xhr = evt.target;
    switch (xhr.status) {
      case window.objects.StatusCode.SUCCESS:
        window.dataStorage.adsOrigin = xhr.response;
        window.dataStorage.adsTransform = window.dataStorage.adsOrigin.slice();
        var points = window.mapLibrary.createPointElements();
        window.mapLibrary.renderPoints(points);
        window.mapLibrary.renderFilters();
        break;
      default:
        window.library.renderErrorMessage(window.objects.ErrorMessage.ERROR_DOWNLOAD);
        break;
    }
  };

  window.dataStorage = {};
  window.dataStorage.adsTransform = [];
  window.dataStorage.adsOrigin = [];

  window.dataStorage.downloadAds = function () {
    window.backend.fetchAds(onFetched, onConnectionError);
  };
})();
