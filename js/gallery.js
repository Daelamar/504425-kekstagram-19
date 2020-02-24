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

  // Функция добавления обработчиков на маленькие фото для открытия большого
  var addPhotoCardListener = function (image, index, array) {
    image.addEventListener('click', function () {
      window.preview.fullSizePicture(array[index]);
    });
  };

  // Функция рендеринга маленьких фото на странице
  var renderPhotoList = function (array) {
    var fragment = document.createDocumentFragment();
    var image;
    for (var i = 0; i < array.length; i++) {
      image = createPhotoElement(array[i]);
      fragment.appendChild(image);
      addPhotoCardListener(image, i, array);
    }
    photoListElement.appendChild(fragment);
  };

  // renderPhotoList(window.data.photosArray);

  // Загружаем данные и при положительном результате отрисовываем фотографии
  window.backend.load(renderPhotoList, window.utils.onError);
})();
