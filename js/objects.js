'use strict';

(function () {
  window.objects = {};

  window.objects.StatusCode = {
    SUCCESS: 200,
    CACHED: 302,
    NOT_FOUND_ERROR: 404,
    SERVER_ERROR: 500
  };
  window.objects.KeyCode = {
    ESC: 27,
    ENTER: 13
  };
  window.objects.ErrorMessage = {
    DOWNLOAD: 'не удалось загрузить объявления',
    PUBLISH: 'не удалось опубликовать объявление'
  };
})();
