'use strict';
(function () {
  var body = document.querySelector('body');

  // Находим поле загрузки фото ,форму редактирования фото и кнопку закрытия формы
  var uploadFieldElement = document.querySelector('#upload-file');
  var changePhotoFormElement = document.querySelector('.img-upload__overlay');
  var closeFormButtonElement = document.querySelector('#upload-cancel');

  var descriptionFieldElement = document.querySelector('.text__description');
  var formElement = document.querySelector('.img-upload__form');

  // Функция закрытия окна формы по нажатию ESC
  var escPressedHandler = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEY_CODE) {
      closeButtonPressedHandler();
    }
  };

  // Функция закрытия окна формы
  var closeButtonPressedHandler = function () {
    changePhotoFormElement.classList.add('hidden');
    document.removeEventListener('keydown', escPressedHandler);
    body.classList.remove('modal-open');
    uploadFieldElement.value = '';
  };

  // Функция открытия окна формы
  var fileUploadHandler = function () {
    resetForm();
    changePhotoFormElement.classList.remove('hidden');
    document.addEventListener('keydown', escPressedHandler);
    body.classList.add('modal-open');
  };

  // Функция сброса данных формы
  var resetForm = function () {
    window.scale.toDefault();
    window.effects.toDefault();
  };

  // Обработчики на поля формы (закрытие, открытие)
  uploadFieldElement.addEventListener('change', fileUploadHandler);

  closeFormButtonElement.addEventListener('click', closeButtonPressedHandler);
  closeFormButtonElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEY_CODE) {
      closeButtonPressedHandler();
    }
  });

  // Обработчики на поля формы для прекращения всплытия
  descriptionFieldElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ESC_KEY_CODE) {
      evt.stopPropagation();
    }
  });

  // Обработчик для отправки формы
  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(formElement), window.utils.onSuccess, window.utils.onError);
  });

  // Для передачи в другие модули
  window.editor = {
    hide: closeButtonPressedHandler,
  };
})();
