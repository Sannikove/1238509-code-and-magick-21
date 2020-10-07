'use strict';

const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
const WIZARDS_AMOUNT = 4;

const userDialog = document.querySelector(`.setup`);
const similarListElement = document.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
.content
.querySelector(`.setup-similar-item`);
const setupOpen = document.querySelector(`.setup-open`);
const setup = document.querySelector(`.setup`);
const setupClose = setup.querySelector(`.setup-close`);
const userNameInput = document.querySelector(`.setup-user-name`);
const setupWizard = document.querySelector(`.setup-wizard `);
const wizardCoat = setupWizard.querySelector(`.wizard-coat `);
const wizardEyes = setupWizard.querySelector(`.wizard-eyes`);
const setupFireball = document.querySelector(`.setup-fireball-wrap`);
const coatColorInput = document.querySelector(`input[name="coat-color"]`);
const eyesColorInput = document.querySelector(`input[name="eyes-color"]`);
const fireballColorInput = document.querySelector(`input[name="fireball-color"]`);

const randomArrayElement = function (arr) {
  let rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

const wizards = [];

for (let i = 0; i < WIZARDS_AMOUNT; i++) {
  wizards[i] = {
    name: randomArrayElement(WIZARD_NAMES) + ` ` + randomArrayElement(WIZARD_SURNAMES),
    coatColor: randomArrayElement(COAT_COLORS),
    eyesColor: randomArrayElement(EYES_COLORS)
  };
}

const renderWizard = function (wizard) {
  let wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

const fragment = document.createDocumentFragment();

for (let i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);

const onPopupEscPress = function (evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePopup();
  }
};

const openPopup = function () {
  setup.classList.remove(`hidden`);

  document.addEventListener(`keydown`, onPopupEscPress);
};

const closePopup = function () {
  setup.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onPopupEscPress);
};

setupOpen.addEventListener(`click`, function () {
  openPopup();
});

setupOpen.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    openPopup();
  }
});

setupClose.addEventListener(`click`, function () {
  closePopup();
});

setupClose.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    closePopup();
  }
});

userNameInput.addEventListener(`keydown`, function () {
  document.removeEventListener(`keydown`, onPopupEscPress);
});

userNameInput.addEventListener(`invalid`, function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity(`Имя должно состоять минимум из 2-х символов`);
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity(`Имя не должно превышать 25-ти символов`);
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity(`Обязательное поле`);
  } else {
    userNameInput.setCustomValidity(``);
  }
});

wizardCoat.addEventListener(`click`, function () {
  wizardCoat.style.fill = randomArrayElement(COAT_COLORS);
  coatColorInput.value = wizardCoat.style.fill;
});

wizardEyes.addEventListener(`click`, function () {
  wizardEyes.style.fill = randomArrayElement(EYES_COLORS);
  eyesColorInput.value = wizardEyes.style.fill;
});

setupFireball.addEventListener(`click`, function () {
  let randomColor = randomArrayElement(FIREBALL_COLORS);
  setupFireball.style.backgroundColor = randomColor;
  fireballColorInput.setAttribute(`value`, randomColor);
});
