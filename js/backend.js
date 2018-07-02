// Модуль обеспечивает загрузку/отправку данных по сети

'use strict';

(function () {
  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var URL_POST = 'https://js.dump.academy/keksobooking';

  window.backend = {};
  window.backend.publishAd = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onLoad);
    xhr.addEventListener('error', onError);

    xhr.open('POST', URL_POST, true);

    xhr.send(data);
  };
  window.backend.fetchAds = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onLoad);
    xhr.addEventListener('error', onError);
    xhr.responseType = 'json';

    xhr.open('GET', URL_GET, true);

    xhr.send();
  };
})();
