'use strict';
(function () {
  var MAX_HASHTAGS_VALUE = 5;
  var MAX_DIGITS_HASHTAG = 20;

  // Находим поля хештегов и комментариев
  var hashtagsFieldElement = document.querySelector('.text__hashtags');
  var descriptionFieldElement = document.querySelector('.text__description');

  // Функция проверки формы на валидность
  var hashtagsFieldValidity = function () {
    var pattern = /^[a-zA-Z0-9#]+$/; // Паттерн значений
    var hashtagValue = hashtagsFieldElement.value.toLowerCase(); // Приводим массив к строчным буквам
    var checkedArray = hashtagValue.split(/\s+/); // Сепаратор - пробел или два
    var uniqueHashtags = []; // Массив для проверки на дубли

    if (checkedArray.length > MAX_HASHTAGS_VALUE) {
      hashtagsFieldElement.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
    }

    for (var i = 0; i < checkedArray.length; i++) {
      var hashtag = checkedArray[i];

      if (hashtag.length === 1 && hashtag.charAt(0) === '') {
        hashtagsFieldElement.setCustomValidity('Хеш-теги должны быть разделены только одним пробелом');
        return;
      } else if (hashtag.length === 1 && hashtag.charAt(0) === '#') {
        hashtagsFieldElement.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
        return;
      } else if (hashtag.length > MAX_DIGITS_HASHTAG) {
        hashtagsFieldElement.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
        return;
      } else if (hashtag.length > 1 && hashtag.charAt(0) !== '#') {
        hashtagsFieldElement.setCustomValidity('Хеш-тег должен начинаться с символа #');
        return;
      } else if (hashtag.length > 1 && pattern.test(hashtag) === false) {
        hashtagsFieldElement.setCustomValidity('Хеш-тег должен состоять из букв и чисел и не может содержать спецсимволы (@, $ и т.п.)');
        return;
      } else if (uniqueHashtags.includes(hashtag) === true) {
        hashtagsFieldElement.setCustomValidity('Не может быть два одинаковых хеш-тега');
        return;
      } else {
        hashtagsFieldElement.setCustomValidity('');
      }
      uniqueHashtags.push(hashtag);
    }
  };

  // Обработчики на поля формы для прекращения всплытия
  hashtagsFieldElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ESC_KEY_CODE) {
      evt.stopPropagation();
    }
  });
  descriptionFieldElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ESC_KEY_CODE) {
      evt.stopPropagation();
    }
  });

  // Обработчик формы для проверки на валидность
  hashtagsFieldElement.addEventListener('input', hashtagsFieldValidity);
})();
