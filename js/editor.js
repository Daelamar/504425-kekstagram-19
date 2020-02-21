'use strict';
(function () {
  var body = document.querySelector('body');

  // Находим поле загрузки фото ,форму редактирования фото и кнопку закрытия формы
  var uploadFieldElement = document.querySelector('#upload-file');
  var changePhotoFormElement = document.querySelector('.img-upload__overlay');
  var closeFormButtonElement = document.querySelector('#upload-cancel');


  // var formElement = document.querySelector('.img-upload__form');

  // Функция закрытия окна формы по нажатию ESC
  var onEscCloseFormHandler = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEY_CODE) {
      hideFormHandler();
    }
  };

  // Функция закрытия окна формы
  var hideFormHandler = function () {
    changePhotoFormElement.classList.add('hidden');
    document.removeEventListener('keydown', onEscCloseFormHandler);
    body.classList.remove('modal-open');
    uploadFieldElement.value = '';
  };

  // Функция открытия окна формы
  var showFormHandler = function () {
    resetForm();
    changePhotoFormElement.classList.remove('hidden');
    document.addEventListener('keydown', onEscCloseFormHandler);
    body.classList.add('modal-open');
  };

  // Функция сброса данных формы
  var resetForm = function () {
    window.scale.toDefault();
    window.effects.toDefault();
  };

  // Обработчики на поля формы (закрытие, открытие)
  uploadFieldElement.addEventListener('change', showFormHandler);

  closeFormButtonElement.addEventListener('click', hideFormHandler);
  closeFormButtonElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEY_CODE) {
      hideFormHandler();
    }
  });

})();
