'use strict';

(function () {
  const CLOUD_WIDTH = 420;
  const CLOUD_HEIGHT = 270;
  const CLOUD_X = 100;
  const CLOUD_Y = 10;
  const GAP = 10;
  const FONT_GAP = 50;
  const TEXT_HEIGHT = 16;
  const BAR_WIDTH = 40;
  const BAR_HEIGHT = -150;
  const FILL_STYLE_COLOR = `black`;

  const renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  const getMaxElement = function (arr) {
    let maxElement = arr[0];

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, `rgba(0, 0, 0, 0.7)`);
    renderCloud(ctx, CLOUD_X, CLOUD_Y, `#fff`);

    ctx.font = `16px PT Mono`;
    ctx.fillStyle = FILL_STYLE_COLOR;
    ctx.fillText(
        `Ура вы победили!`,
        CLOUD_X + GAP * 3,
        CLOUD_Y + GAP * 3
    );
    ctx.fillText(
        `Список результатов:`,
        CLOUD_X + GAP * 3,
        CLOUD_Y + GAP * 5
    );

    const maxTime = getMaxElement(times);

    for (let i = 0; i < names.length; i++) {
      let X_COORDINATE = CLOUD_X + FONT_GAP + (FONT_GAP + BAR_WIDTH) * i;

      ctx.fillStyle = FILL_STYLE_COLOR;
      ctx.fillText(
          names[i],
          X_COORDINATE,
          CLOUD_HEIGHT - GAP
      );

      ctx.fillText(
          Math.round(times[i]),
          X_COORDINATE,
          CLOUD_HEIGHT - 2 * GAP - TEXT_HEIGHT + ((BAR_HEIGHT * times[i]) / maxTime)
      );

      if (names[i] === `Вы`) {
        ctx.fillStyle = `rgba(255, 0, 0, 1)`;
      } else {
        ctx.fillStyle = `hsl(240,` + Math.floor(Math.random() * 100) + `%` + `, 50%)`;
      }

      ctx.fillRect(
          X_COORDINATE,
          CLOUD_HEIGHT - GAP - TEXT_HEIGHT,
          BAR_WIDTH,
          (BAR_HEIGHT * times[i]) / maxTime
      );
    }
  };
})();
