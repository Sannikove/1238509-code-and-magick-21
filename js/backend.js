'use strict';
(function () {
  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;

  const getXhr = function (method, URL, data, onLoad, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });
    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(method, URL);
    xhr.send(data);
  };

  const save = function (data, onLoad, onError) {
    getXhr(`POST`, `https://21.javascript.pages.academy/code-and-magick`, data, onLoad, onError);
  };

  const load = function (onLoad, onError) {
    getXhr(`GET`, `https://21.javascript.pages.academy/code-and-magick/data`, null, onLoad, onError);
  };

  window.backend = {
    save,
    load
  };
})();
