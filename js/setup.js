'use strict';

(function () {
  const WIZARDS_AMOUNT = 4;
  const userDialog = document.querySelector(`.setup`);
  const similarListElement = document.querySelector(`.setup-similar-list`);
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);


  const renderWizard = function (wizard) {
    let wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;

    return wizardElement;
  };

  const successHandler = function (wizards) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < WIZARDS_AMOUNT; i++) {
      fragment.appendChild(renderWizard(window.util.randomArrayElement(wizards)));
    }
    similarListElement.appendChild(fragment);

    userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
  };

  const errorHandler = function (errorMessage) {
    let node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.backend.load(successHandler, errorHandler);

  const form = userDialog.querySelector(`.setup-wizard-form`);

  const submitHandler = function (evt) {
    window.backend.save(new FormData(form), function () {
      userDialog.classList.add(`hidden`);
    });
    evt.preventDefault();
  };
  form.addEventListener(`submit`, submitHandler);
})();
