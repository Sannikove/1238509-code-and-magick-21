'use strict';

(function () {
  const ESC_KEYCODE = 27;
  const ENTER_KEYCODE = 13;

  const isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  const isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  const randomArrayElement = function (arr) {
    let rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
  };

  window.util = {
    isEscEvent,
    isEnterEvent,
    randomArrayElement
  };
})();

