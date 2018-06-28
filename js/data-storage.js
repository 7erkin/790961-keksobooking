// Модуль, который использует интерфейс загрузки данных по сети и хранит эти данные.
// Использует интерфейс отображения ошибки, если в процессе загрузки что то случилось

'use strict';

(function () {
  var ERROR_MESSAGE = 'не удалось загрузить объявления';

  /**
   * Колбэк в случае возникновения ошибки запроса
   */
  var onConnectionError = function () {
    window.library.renderErrorMessage(ERROR_MESSAGE);
  };

  /**
   * Колбэк в случае успешного выполнения запроса
   * @param {Event} evt
   */
  var onFetched = function (evt) {
    var xhr = evt.target;
    switch (xhr.status) {
      case window.objects.Code.SUCCESS:
        window.dataStorage.adsOrigin = xhr.response;
        window.dataStorage.adsTransform = window.dataStorage.adsOrigin.slice();
        var points = window.mapLibrary.createPointElements();
        window.mapLibrary.renderPoints(points);
        window.mapLibrary.renderFilters();
        break;
      default:
        window.library.renderErrorMessage(ERROR_MESSAGE);
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
