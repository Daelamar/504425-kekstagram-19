'use strict';
(function () {
  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  // Находим шаблон для отрисовки окна после успешной или неудачной отправки
  var mainElement = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  // Функция случайного числа в диапазоне
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Функция возврата случайного элемента из массива
  var getRandomItem = function (array) {
    return array[getRandomNumber(0, array.length - 1)];
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
  // // Функция создания сообщения об ошибке ( при загрузке/отправке данных )
  // var showErrorMessageHandler = function (errorMessage) {
  //   var errorElement = document.createElement('div');
  //   errorElement.classList.add('error-message');
  //   errorElement.style.backgroundColor = 'white';
  //   errorElement.style.color = 'black';
  //   errorElement.style.textAlign = 'center';
  //   errorElement.style.position = 'fixed';
  //   errorElement.style.width = '400px';
  //   errorElement.style.height = '100px';
  //   errorElement.style.border = '2px solid black';
  //   errorElement.style.left = '38%';
  //   errorElement.style.top = '20%';
  //   errorElement.style.fontSize = '28px';
  //   errorElement.style.zIndex = '10';
  //   errorElement.textContent = errorMessage;
  //   document.body.appendChild(errorElement);
  //   setTimeout(function () {
  //     errorElement.remove();
  //   }, TIMEOUT);
  // };

  // Для передачи в другие модули
  window.utils = {
    getRandomNumber: getRandomNumber,
    getRandomItem: getRandomItem,
    onError: onError,
    onSuccess: onSuccess,
    ESC_KEY_CODE: ESC_KEY_CODE,
    ENTER_KEY_CODE: ENTER_KEY_CODE,
  };
})();
