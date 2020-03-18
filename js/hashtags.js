'use strict';
(function () {
  var MAX_HASHTAGS_VALUE = 5;

  var PATTERN = /^#[а-яА-ЯёЁA-Za-z0-9_]{1,19}$/; // Паттерн значений

  // Находим поля хештегов
  var inputElement = document.querySelector('.text__hashtags');

  // Функция проверки формы на валидность
  var hashtagsInputHandler = function () {

    var hashtagsString = inputElement.value.toLowerCase(); // Приводим массив к строчным буквам
    var hashtags = hashtagsString.split(/\s+/); // Сепаратор - пробел или два
    var uniqueHashtags = []; // Массив для проверки на дубли

    if (hashtags.length > MAX_HASHTAGS_VALUE) {
      inputElement.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
    }

    for (var i = 0; i < hashtags.length; i++) {
      var hashtag = hashtags[i];

      if (hashtag.length === 1 && hashtag.charAt(0) === '#') {
        inputElement.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
        inputElement.style.borderColor = 'red';
        return;
      } else if (hashtag.length > 1 && PATTERN.test(hashtag) === false) {
        inputElement.setCustomValidity('Хеш-тег не может содержать спецсимволы (@, $ и т.п.), должен начинаться с символа #, максимальная длина одного хэш-тега 20 символов, включая решётку');
        inputElement.style.borderColor = 'red';
        return;
      } else if (uniqueHashtags.includes(hashtag) === true) {
        inputElement.setCustomValidity('Не может быть два одинаковых хеш-тега');
        inputElement.style.borderColor = 'red';
        return;
      } else {
        inputElement.setCustomValidity('');
        inputElement.style.borderColor = 'rgb(238, 238, 238)';
      }
      uniqueHashtags.push(hashtag);
    }
  };

  // Обработчик формы для проверки на валидность
  inputElement.addEventListener('input', hashtagsInputHandler);

  inputElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ESC_KEY_CODE) {
      evt.stopPropagation();
    }
  });

})();
