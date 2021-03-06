'use strict';
(function () {
  // Находим шаблон для отрисовки маленького фото
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

  // Находим блок для отрисовки маленьких фотографий пользователей
  var photoListElement = document.querySelector('.pictures');

  var defaultPhotos = false;

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
  var addPhotoCardListener = function (image, index, data) {
    image.addEventListener('click', function () {
      window.preview.showBigPicture(data[index]);
    });
  };

  // Функция рендеринга маленьких фото на странице
  var renderPhotoList = function (data) {
    if (!defaultPhotos) {
      defaultPhotos = data;
    }

    var smallPictures = photoListElement.querySelectorAll('.picture');

    smallPictures.forEach(function (item) {
      photoListElement.removeChild(item);
    });

    var fragment = document.createDocumentFragment();
    var image;

    for (var i = 0; i < data.length; i++) {
      image = createPhotoElement(data[i]);
      fragment.appendChild(image);
      addPhotoCardListener(image, i, data);
    }

    photoListElement.appendChild(fragment);
    window.filters.listElement.classList.remove('img-filters--inactive');
  };

  var getPhotos = function () {
    return defaultPhotos;
  };

  // Загружаем данные и при положительном результате отрисовываем фотографии
  window.backend.load(renderPhotoList, window.utils.onError);


  // Для передачи в другие модули
  window.gallery = {
    getPhotos: getPhotos,
    renderPhotoList: renderPhotoList
  };
})();
