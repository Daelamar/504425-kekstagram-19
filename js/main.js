'use strict';

var ESC_KEY = 27;
var ENTER_KEY = 13;

// Колличество фото на странице
var NUMBER_OF_PHOTOS = 25;

// Максимальное и минимальное значение лайков
var MIN_LIKES = 15;
var MAX_LIKES = 200;

// Максимальное и минимальное значение адреса у аватара
var MIN_AVATARS = 1;
var MAX_AVATARS = 6;

// Максимальное и минимальное колличество комментариев к фотографии
var MIN_COMMENTS = 1;
var MAX_COMMENTS = 2;

// Находим шаблон для отрисовки фото
var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Находим блок для отрисовки фотографий пользователей
var photoListElement = document.querySelector('.pictures');

// Находим блок большого фото
var bigPhotoElement = document.querySelector('.big-picture');

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

// Находим поле загрузки фото ,форму редактирования фото и кнопку закрытия формы
var uploadFieldElement = document.querySelector('#upload-file');
var changePhotoFormElement = document.querySelector('.img-upload__overlay');
var closeFormButtonElement = document.querySelector('#upload-cancel');

// Находим поля хештегов и комментариев
var hashtagsFieldElement = document.querySelector('.text__hashtags');
var descriptionFieldElement = document.querySelector('.text__description');

// Создаем массив имен
var namesArray = [
  'Светлана',
  'Берта',
  'Никита',
  'Лаврентий',
  'Дина',
  'Якуб',
  'Анфиса',
  'Доминика',
  'Виссарион',
  'Лада',
  'Ярослав',
  'Виктор',
  'Пелагея',
  'Василиса',
  'Любава',
];

// Создаем массив комментариев
var messagesArray = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

// Функция случайного числа в диапазоне
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция возврата случайного элемента из массива
var getRandomItem = function (array) {
  return array[getRandomNumber(0, array.length - 1)];
};

// Функция получения случайного сообщения в комментарий
var getMessages = function (number) {
  var message = [];
  for (var i = 1; i <= number; i++) {
    message.push(getRandomItem(messagesArray));
  }
  return message.join(' ');
};

// Функция получения комментария
var getComment = function (number) {
  var commentsArray = [];
  for (var i = 1; i <= number; i++) {
    var comment = {
      avatar: 'img/avatar-' + getRandomNumber(MIN_AVATARS, MAX_AVATARS) + '.svg',
      message: getMessages(getRandomNumber(MIN_COMMENTS, MAX_COMMENTS)),
      name: getRandomItem(namesArray),
    };
    commentsArray.push(comment);
  }
  return commentsArray;
};

// Создаем функцию генерации фото и добавления их в массив
var createPhotoArray = function (number) {
  var photoArray = [];
  for (var i = 1; i <= number; i++) {
    var photo = {
      url: 'photos/' + [i] + '.jpg',
      description: 'Описание фотографии',
      likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: getComment(getRandomNumber(MIN_COMMENTS, MAX_COMMENTS)),
    };
    photoArray.push(photo);
  }
  return photoArray;
};

// Сохраняем массив из 25 фотографий
var photosArray = createPhotoArray(NUMBER_OF_PHOTOS);

// Функция заполнения html-элементов маленькой фотографии ( адрес,комментарий и т.д. )
var createPhotoElement = function (photo) {
  var photoElement = photoTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__img').alt = photo.description;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;

  return photoElement;
};
// Функция заполнения html-элементов комментария к большому фото ( аватар, текст )
var createCommentElement = function (array) {
  var commentElement = comments[0].cloneNode(true);

  commentElement.querySelector('.social__picture').setAttribute('src', array.avatar);
  commentElement.querySelector('.social__picture').setAttribute('alt', array.name);
  commentElement.querySelector('.social__text').textContent = array.message;

  return commentElement;
};

// Функция рендеринга маленьких фото на странице
var renderPhotoList = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(createPhotoElement(array[i]));
  }
  photoListElement.appendChild(fragment);
};

// Функция рендеринга комментариев для полноэкранного фото
var renderComment = function (array) {
  var commentsList = bigPhotoElement.querySelector('.social__comments');
  var fragment = document.createDocumentFragment();

  while (commentsList.firstChild) {
    commentsList.removeChild(commentsList.firstChild);
  }

  for (var i = 0; i < array.length; i++) {
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
};

// Функция закрытия окна по нажатию ESC
var onEscCloseFormHandler = function (evt) {
  if (evt.keyCode === ESC_KEY && hashtagsFieldElement !== evt.target && descriptionFieldElement !== evt.target) {
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
  changePhotoFormElement.classList.remove('hidden');
  document.addEventListener('keydown', onEscCloseFormHandler);
  body.classList.add('modal-open');
};

renderPhotoList(photosArray);
// showBigPicture(photosArray[0]);

uploadFieldElement.addEventListener('change', showFormHandler);

closeFormButtonElement.addEventListener('click', hideFormHandler);
closeFormButtonElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY) {
    hideFormHandler();
  }
});
