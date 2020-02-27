'use strict';
(function () {
  // Минимальный и максимальный размеры фото-превью в форме + шаг для масштаба
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var STEP = 25;

  // Находим кнопки размера фотографии и поле для значения, так же саму фото-превью
  var changePhotoFormElement = document.querySelector('.img-upload__overlay');
  var decreaseButtonElement = changePhotoFormElement.querySelector('.scale__control--smaller');
  var increaseButtonElement = changePhotoFormElement.querySelector('.scale__control--bigger');
  var scaleValueElement = changePhotoFormElement.querySelector('.scale__control--value');
  var previewImgElement = document.querySelector('.img-upload__preview').firstElementChild;

  // Функция уменьшения размера фото-превью в форме
  var decreasePreviewImgHandler = function () {
    var scale = parseInt(scaleValueElement.value, 10);
    if (scale > MIN_SCALE) {
      previewImgElement.style.transform = 'scale(' + (scale - STEP) / 100 + ')';
      scaleValueElement.value = (scale - STEP) + '%';
    }
  };

  // Функция увеличения размера фото-превью в форме
  var increasePreviewImgHandler = function () {
    var scale = parseInt(scaleValueElement.value, 10);
    if (scale < MAX_SCALE) {
      previewImgElement.style.transform = 'scale(' + (scale + STEP) / 100 + ')';
      scaleValueElement.value = (scale + STEP) + '%';
    }
  };

  var reset = function () {
    scaleValueElement.value = MAX_SCALE + '%';
    previewImgElement.style.transform = 'none';
  };

  // Обработчики на поля формы (изменение масштаба )
  decreaseButtonElement.addEventListener('click', decreasePreviewImgHandler);
  increaseButtonElement.addEventListener('click', increasePreviewImgHandler);

  // Для передачи в другие модули
  window.scale = {
    toDefault: reset,
  };
})();
