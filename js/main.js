'use strict';

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

// Создаем массив имен
var names = [
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
var messagesArr = [
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
    message.push(getRandomItem(messagesArr));
  }
  return message.join(' ');
};

// Функция получения комментария
var getComment = function (number) {
  var commentsArr = [];
  for (var i = 1; i <= number; i++) {
    var comment = {
      avatar: 'img/avatar-' + getRandomNumber(MIN_AVATARS, MAX_AVATARS) + '.svg',
      message: getMessages(getRandomNumber(MIN_COMMENTS, MAX_COMMENTS)),
      name: getRandomItem(names),
    };
    commentsArr.push(comment);
  }
  return commentsArr;
};

// Создаем функцию генерации фото и добавления их в массив
var createPhoto = function (number) {
  var photoArr = [];
  for (var i = 1; i <= number; i++) {
    var photo = {
      url: 'photos/' + [i] + '.jpg',
      description: 'Описание фотографии',
      likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: getComment(getRandomNumber(MIN_COMMENTS, MAX_COMMENTS)),
    };
    photoArr.push(photo);
  }
  return photoArr;
};

// Функция заполнения html-элементов фотографии ( адрес,комментарий и т.д. )
var createPhotoElement = function (photo) {
  var photoElement = photoTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__img').alt = photo.description;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;

  return photoElement;
};

// Функция отрисовки фото на странице
var renderPhotoList = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(createPhotoElement(array[i]));
  }
  photoListElement.appendChild(fragment);
};

renderPhotoList(createPhoto(NUMBER_OF_PHOTOS));
