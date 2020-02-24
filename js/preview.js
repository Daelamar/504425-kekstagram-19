'use strict';
(function () {
  // Максимальное  колличество комментариев к фотографии

  var MAX_COMMENTS = 5;

  // Находим блок большого фото и кнопку его закрытия
  var bigPhotoElement = document.querySelector('.big-picture');
  var bigPhotoCloseElement = document.querySelector('.big-picture__cancel');

  // Находим шаблоны комментариев
  var comments = bigPhotoElement.querySelectorAll('.social__comment');

  // Находим нужные HTML элементы большого фото
  var pictureImgElement = bigPhotoElement.querySelector('.big-picture__img').firstElementChild;
  var pictureLikesCountElement = bigPhotoElement.querySelector('.likes-count');
  var pictureCaptionElement = bigPhotoElement.querySelector('.social__caption');
  var pictureCommentsCountMainElement = bigPhotoElement.querySelector('.social__comment-count');
  var pictureCommentsCountElement = bigPhotoElement.querySelector('.comments-count');
  var pictureCommentsLoaderElement = bigPhotoElement.querySelector('.comments-loader');
  var body = document.querySelector('body');

  // Функция заполнения html-элементов комментария к большому фото ( аватар, текст )
  var createCommentElement = function (array) {
    var commentElement = comments[0].cloneNode(true);

    commentElement.querySelector('.social__picture').setAttribute('src', array.avatar);
    commentElement.querySelector('.social__picture').setAttribute('alt', array.name);
    commentElement.querySelector('.social__text').textContent = array.message;

    return commentElement;
  };

  // Функция рендеринга комментариев для полноэкранного фото
  var renderComment = function (array) {
    var commentsList = bigPhotoElement.querySelector('.social__comments');
    var fragment = document.createDocumentFragment();

    while (commentsList.firstChild) {
      commentsList.removeChild(commentsList.firstChild);
    }

    for (var i = 0; i < MAX_COMMENTS; i++) {
      fragment.appendChild(createCommentElement(array[i]));
    }
    commentsList.appendChild(fragment);
  };

  // Функция для рендеринга полноэкранной фотографии
  var showBigPicture = function (photo) {
    pictureImgElement.setAttribute('src', photo.url);
    pictureLikesCountElement.textContent = photo.likes;
    pictureCaptionElement.textContent = photo.description;
    pictureCommentsCountElement.textContent = photo.comments.length;
    renderComment(photo.comments);
    pictureCommentsCountMainElement.classList.add('hidden');
    pictureCommentsLoaderElement.classList.add('hidden');
    bigPhotoElement.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onEscCloseBigPictureHandler);
  };

  // Функция закрытия большого фото
  var hideBigPictureHandler = function () {
    bigPhotoElement.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscCloseBigPictureHandler);
  };

  var onEscCloseBigPictureHandler = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEY_CODE) {
      hideBigPictureHandler();
    }
  };

  // showBigPicture(window.data.photosArray[0]);

  bigPhotoCloseElement.addEventListener('click', hideBigPictureHandler);

  // Для передачи в другие модули
  window.preview = {
    fullSizePicture: showBigPicture,
  };
})();
