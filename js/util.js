'use strict';
(function () {
  var ESC_KEY = 27;
  var ENTER_KEY = 13;

  // Функция случайного числа в диапазоне
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Функция возврата случайного элемента из массива
  var getRandomItem = function (array) {
    return array[getRandomNumber(0, array.length - 1)];
  };

  // Для передачи в другие модули
  window.util = {
    getRandomNumber: getRandomNumber,
    getRandomItem: getRandomItem,
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY,
  };
})();
