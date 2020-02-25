'use strict';
(function () {
  var MAX_HASHTAGS_VALUE = 5;
  var MAX_DIGITS_HASHTAG = 20;

  var PATTERN = /^[a-zA-Z0-9#]+$/; // Паттерн значений

  // Находим поля хештегов
  var inputElement = document.querySelector('.text__hashtags');

  // Функция проверки формы на валидность
  var setValidateHandler = function () {

    var hashtagsString = inputElement.value.toLowerCase(); // Приводим массив к строчным буквам
    var hashtags = hashtagsString.split(/\s+/); // Сепаратор - пробел или два
    var uniqueHashtags = []; // Массив для проверки на дубли

    if (hashtags.length > MAX_HASHTAGS_VALUE) {
      inputElement.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
    }

    for (var i = 0; i < hashtags.length; i++) {
      var hashtag = hashtags[i];

      if (hashtag.length === 1 && hashtag.charAt(0) === '') {
        inputElement.setCustomValidity('Хеш-теги должны быть разделены только одним пробелом');
        return;
      } else if (hashtag.length === 1 && hashtag.charAt(0) === '#') {
        inputElement.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
        return;
      } else if (hashtag.length > MAX_DIGITS_HASHTAG) {
        inputElement.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
        return;
      } else if (hashtag.length > 1 && hashtag.charAt(0) !== '#') {
        inputElement.setCustomValidity('Хеш-тег должен начинаться с символа #');
        return;
      } else if (hashtag.length > 1 && PATTERN.test(hashtag) === false) {
        inputElement.setCustomValidity('Хеш-тег должен состоять из букв и чисел и не может содержать спецсимволы (@, $ и т.п.)');
        return;
      } else if (uniqueHashtags.includes(hashtag) === true) {
        inputElement.setCustomValidity('Не может быть два одинаковых хеш-тега');
        return;
      } else {
        inputElement.setCustomValidity('');
      }
      uniqueHashtags.push(hashtag);
    }
  };

  // Обработчик формы для проверки на валидность
  inputElement.addEventListener('input', setValidateHandler);

  inputElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ESC_KEY_CODE) {
      evt.stopPropagation();
    }
  });

})();
