'use strict';
(function () {
  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  // Функция случайного числа в диапазоне
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Функция возврата случайного элемента из массива
  var getRandomItem = function (array) {
    return array[getRandomNumber(0, array.length - 1)];
  };

  // Функция создания сообщения об ошибке ( при загрузке/отправке данных )
  var showErrorMessageHandler = function (errorMessage) {
    var errorElement = document.createElement('div');
    errorElement.classList.add('error-message');
    errorElement.style.backgroundColor = 'white';
    errorElement.style.color = 'black';
    errorElement.style.textAlign = 'center';
    errorElement.style.position = 'fixed';
    errorElement.style.width = '400px';
    errorElement.style.height = '100px';
    errorElement.style.border = '2px solid black';
    errorElement.style.left = '38%';
    errorElement.style.top = '20%';
    errorElement.style.fontSize = '28px';
    errorElement.style.zIndex = '10';
    errorElement.textContent = errorMessage;
    document.body.appendChild(errorElement);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEY_CODE) {
        errorElement.remove();
      }
    });
  };

  // Для передачи в другие модули
  window.utils = {
    getRandomNumber: getRandomNumber,
    getRandomItem: getRandomItem,
    onError: showErrorMessageHandler,
    ESC_KEY_CODE: ESC_KEY_CODE,
    ENTER_KEY_CODE: ENTER_KEY_CODE,
  };
})();
