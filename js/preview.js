'use strict';
(function () {
  // Максимальное колличество комментариев к фотографии
  var MAX_DISPLAY_COMMENTS = 5;

  // Находим блок большого фото и кнопку его закрытия
  var bigPhotoElement = document.querySelector('.big-picture');
  var bigPhotoCloseElement = document.querySelector('.big-picture__cancel');

  // Находим шаблоны комментариев
  var bigPhotoCommentsList = bigPhotoElement.querySelector('.social__comments');
  var commentsElements = bigPhotoCommentsList.querySelector('.social__comment');

  // Находим нужные HTML элементы большого фото
  var pictureImgElement = bigPhotoElement.querySelector('.big-picture__img').firstElementChild;
  var pictureLikesCountElement = bigPhotoElement.querySelector('.likes-count');
  var pictureCaptionElement = bigPhotoElement.querySelector('.social__caption');
  var pictureCommentsCountMainElement = bigPhotoElement.querySelector('.social__comment-count');
  var pictureVisibleCommentsElement = pictureCommentsCountMainElement.querySelector('.comments-count-amount');
  var pictureCommentsCountElement = bigPhotoElement.querySelector('.comments-count');
  var pictureCommentsLoaderElement = bigPhotoElement.querySelector('.comments-loader');
  var body = document.querySelector('body');
  var currentComments;

  // Функция заполнения html-элементов комментария к большому фото ( аватар, текст )
  var createCommentElement = function (comments) {
    var commentElement = commentsElements.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comments.avatar;
    commentElement.querySelector('.social__picture').alt = comments.name;
    commentElement.querySelector('.social__text').textContent = comments.message;

    return commentElement;
  };

  // Собирает все комментарии в один фрагмент для удобства вывода с n-ого комментария
  var getCommentList = function (comments) {
    var fragment = document.createDocumentFragment();
    comments.forEach(function (comment) {
      fragment.appendChild(createCommentElement(comment));
    });
    return fragment;
  };

  // Функция рендеринга комментариев для полноэкранного фото
  var loadComments = function (comments) {
    var startCommentsCount = bigPhotoCommentsList.querySelectorAll('.social__comment').length;
    var commentsSection = comments.slice(startCommentsCount, startCommentsCount + MAX_DISPLAY_COMMENTS);
    bigPhotoCommentsList.appendChild(getCommentList(commentsSection));
  };

  // Функция проверки длинны списка комментариев под фото
  var checkCommentsLength = function (comments) {
    var totalCommentsCount = bigPhotoCommentsList.querySelectorAll('.social__comment').length;
    if (totalCommentsCount === comments.length) {
      pictureCommentsLoaderElement.classList.add('hidden');
      pictureCommentsLoaderElement.removeEventListener('click', onLoadCommentsClick);
    }

    pictureVisibleCommentsElement.textContent = totalCommentsCount;
  };

  var onLoadCommentsClick = function () {
    loadComments(currentComments);
    checkCommentsLength(currentComments);
  };

  var mainElement = document.querySelector('main');

  // Функция для рендеринга полноэкранной фотографии
  var showBigPicture = function (photo) {
    bigPhotoElement.remove();

    bigPhotoElement.classList.remove('hidden');
    pictureCommentsLoaderElement.classList.remove('hidden');
    pictureImgElement.src = photo.url;
    pictureLikesCountElement.textContent = photo.likes;
    pictureCaptionElement.textContent = photo.description;
    pictureCommentsCountElement.textContent = photo.comments.length;
    bigPhotoCommentsList.innerHTML = '';
    body.classList.add('modal-open');
    currentComments = photo.comments;
    loadComments(currentComments);
    checkCommentsLength(currentComments);
    pictureCommentsLoaderElement.addEventListener('click', onLoadCommentsClick);
    document.addEventListener('keydown', onEscPressedHandler);

    mainElement.append(bigPhotoElement);
  };

  // Функция закрытия большого фото
  var hideBigPictureHandler = function () {
    bigPhotoElement.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscPressedHandler);
  };

  var onEscPressedHandler = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEY_CODE) {
      hideBigPictureHandler();
    }
  };

  bigPhotoCloseElement.addEventListener('click', hideBigPictureHandler);

  // Для передачи в другие модули
  window.preview = {
    showBigPicture: showBigPicture,
  };
})();
