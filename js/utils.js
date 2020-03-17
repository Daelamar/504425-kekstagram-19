'use strict';
(function () {
  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  // Находим шаблон для отрисовки окна после успешной или неудачной отправки
  var mainElement = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;

  // Функция устранения дребезга
  var debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  // Функция случайного числа в диапазоне
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Функция перемешивания массива в случайном порядке
  var getRandomItems = function (items, count) {
    var shuffledItems = [];

    while (shuffledItems.length < count) {
      var randomIndex = getRandomNumber(0, items.length - 1);
      var element = items.splice(randomIndex, 1)[0];
      shuffledItems.push(element);
    }

    return shuffledItems;
  };

  // Функция поведения формы после удачной загрузке
  var onSuccess = function () {
    var success = successTemplate.cloneNode(true);
    var closeElement = success.querySelector('.success__button');

    window.editor.hide();
    mainElement.appendChild(success);

    var escCloseHandler = function (evt) {
      if (evt.keyCode === window.utils.ESC_KEY_CODE) {
        mainElement.removeChild(success);
      }
      document.removeEventListener('keydown', escCloseHandler);
    };

    var clickCloseHandler = function () {
      mainElement.removeChild(success);
      document.removeEventListener('click', clickCloseHandler);
    };

    closeElement.addEventListener('click', function (evt) {
      if (evt.target === success) {
        mainElement.removeChild(success);
      }
    });
    document.addEventListener('keydown', escCloseHandler);
    document.addEventListener('click', clickCloseHandler);
  };

  // Функция поведения формы после неудачной загрузки
  var onError = function (errorMessage) {
    var error = errorTemplate.cloneNode(true);
    var closeElement = error.querySelector('.error__button');
    var innerTitleElement = error.querySelector('.error__title');
    var errorText = document.createElement('p');

    window.editor.hide();
    mainElement.appendChild(error);
    innerTitleElement.appendChild(errorText);
    errorText.textContent = errorMessage;

    var escCloseHandler = function (evt) {
      if (evt.keyCode === window.utils.ESC_KEY_CODE) {
        mainElement.removeChild(error);
      }
      document.removeEventListener('keydown', escCloseHandler);
    };

    var clickCloseHandler = function () {
      mainElement.removeChild(error);
      document.removeEventListener('click', clickCloseHandler);
    };

    closeElement.addEventListener('click', function (evt) {
      if (evt.target === error) {
        mainElement.removeChild(error);
      }
    });
    document.addEventListener('keydown', escCloseHandler);
    document.addEventListener('click', clickCloseHandler);
  };

  // Для передачи в другие модули
  window.utils = {
    getRandomNumber: getRandomNumber,
    onError: onError,
    onSuccess: onSuccess,
    getRandomItems: getRandomItems,
    debounce: debounce,
    ESC_KEY_CODE: ESC_KEY_CODE,
    ENTER_KEY_CODE: ENTER_KEY_CODE,
  };
})();
