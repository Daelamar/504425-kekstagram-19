'use strict';
(function () {
  var RANDOM_PHOTO_NUMBER = 10;

  // Находим список фильтров и кнопки фильров
  var listElement = document.querySelector('.img-filters');
  var filterButtons = document.querySelectorAll('.img-filters__button');

  // Функция отображения нажатой кнопки в фильтре изображений
  var filterButtonActiveHandler = function (evt) {
    for (var i = 0; i < filterButtons.length; i++) {
      if (filterButtons[i] === evt.target) {
        filterButtons[i].classList.add('img-filters__button--active');
      } else {
        filterButtons[i].classList.remove('img-filters__button--active');
      }
    }
  };

  // Функция отрисовки 10 случайных фото из массива
  var renderRandomPhotos = function () {
    var randomPhotos = [];
    var array = window.utils.getShuffleArray(window.gallery.getDefaultPhotoList().slice());

    for (var i = 0; i < RANDOM_PHOTO_NUMBER; i++) {
      randomPhotos.push(array[i]);
    }

    window.gallery.renderPhotoList(randomPhotos);
  };

  // Функция отрисовки фото по количеству комментариев
  var renderPhotosByComments = function () {
    var array = window.gallery.getDefaultPhotoList().slice().sort(function (left, right) {
      return right.comments.length - left.comments.length;
    });
    window.gallery.renderPhotoList(array);
  };

  // Функция рендоринга фото в зависимости от фильтра
  var filterButtonClickHandler = function (evt) {
    switch (evt.target.id) {
      case 'filter-default':
        window.utils.debounce(window.gallery.renderPhotoList(window.gallery.getDefaultPhotoList()));
        break;
      case 'filter-random':
        window.utils.debounce(renderRandomPhotos);
        break;
      case 'filter-discussed':
        window.utils.debounce(renderPhotosByComments);
        break;
    }
  };

  // Обработчик для показа активного фильтра
  for (var i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener('click', function (evt) {
      filterButtonActiveHandler(evt);
      filterButtonClickHandler(evt);
    });
  }

  // Для передачи в другие модули
  window.filters = {
    listElement: listElement,
  };
})();
