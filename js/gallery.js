'use strict';
(function () {
  // Находим шаблон для отрисовки маленького фото
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

  // Находим блок для отрисовки маленьких фотографий пользователей
  var photoListElement = document.querySelector('.pictures');

  // Функция заполнения html-элементов маленькой фотографии ( адрес,комментарий и т.д. )
  var createPhotoElement = function (photo) {
    var photoElement = photoTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__img').alt = photo.description;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;

    return photoElement;
  };

  // Функция рендеринга маленьких фото на странице
  var renderPhotoList = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(createPhotoElement(array[i]));
    }
    photoListElement.appendChild(fragment);
  };

  renderPhotoList(window.data.photosArray);
})();
