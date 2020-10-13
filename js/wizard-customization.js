'use strict';

(function () {
  const FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
  const setupWizard = document.querySelector(`.setup-wizard `);
  const wizardCoat = setupWizard.querySelector(`.wizard-coat `);
  const wizardEyes = setupWizard.querySelector(`.wizard-eyes`);
  const setupFireball = document.querySelector(`.setup-fireball-wrap`);
  const coatColorInput = document.querySelector(`input[name="coat-color"]`);
  const eyesColorInput = document.querySelector(`input[name="eyes-color"]`);
  const fireballColorInput = document.querySelector(`input[name="fireball-color"]`);

  wizardCoat.addEventListener(`click`, function () {
    wizardCoat.style.fill = window.util.randomArrayElement(window.setup.COAT_COLORS);
    coatColorInput.value = wizardCoat.style.fill;
  });

  wizardEyes.addEventListener(`click`, function () {
    wizardEyes.style.fill = window.util.randomArrayElement(window.setup.EYES_COLORS);
    eyesColorInput.value = wizardEyes.style.fill;
  });

  setupFireball.addEventListener(`click`, function () {
    let randomColor = window.util.randomArrayElement(FIREBALL_COLORS);
    setupFireball.style.backgroundColor = randomColor;
    fireballColorInput.setAttribute(`value`, randomColor);
  });
})();
