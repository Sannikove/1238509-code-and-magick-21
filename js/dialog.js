'use strict';

(function () {
  const setupOpen = document.querySelector(`.setup-open`);
  const setup = document.querySelector(`.setup`);
  const setupClose = setup.querySelector(`.setup-close`);
  const userNameInput = document.querySelector(`.setup-user-name`);
  const dialogHandle = setup.querySelector(`.upload`);
  const POPUP_X = 80 + `px`;
  const POPUP_Y = 50 + `%`;

  window.dialog = {
    userNameInput
  };

  const onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  const openPopup = function () {
    setup.classList.remove(`hidden`);

    document.addEventListener(`keydown`, onPopupEscPress);
  };

  const closePopup = function () {
    setup.classList.add(`hidden`);
    document.removeEventListener(`keydown`, onPopupEscPress);
    setup.style.top = POPUP_X;
    setup.style.left = POPUP_Y;
  };

  setupOpen.addEventListener(`click`, function () {
    openPopup();
  });

  setupOpen.addEventListener(`keydown`, function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener(`click`, function () {
    closePopup();
  });

  setupClose.addEventListener(`keydown`, function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  userNameInput.addEventListener(`keydown`, function () {
    document.removeEventListener(`keydown`, onPopupEscPress);
  });

  dialogHandle.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + `px`;
      setup.style.left = (setup.offsetLeft - shift.x) + `px`;
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        const onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener(`click`, onClickPreventDefault);
        };
        dialogHandle.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
})();
