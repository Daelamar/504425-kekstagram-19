'use strict';

var NUMBER_OF_PHOTOS = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_AVATARS = 1;
var MAX_AVATARS = 6;
var MIN_COMMENTS = 1;
var MAX_COMMENTS = 2;

// Находим шаблон для отрисовки фото
var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Находим блок для отрисовки фотографий пользователей
var photoListElement = document.querySelector('.pictures');

// Создаем фрагмент
var fragment = document.createDocumentFragment();

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
var messageArr = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

// // Создаем пустой массив, в который будем закидывать объекты
var mockArr = [];

// Создаем функцию получения сообщений в комментарии
var getMessages = function (number) {
  var message = [];
  for (var i = 1; i <= number; i += 1) {
    message.push(messageArr[getRandom(0, messageArr.length - 1)]);
  }
  return message.join(' ');
};

// Функция случайного числа в диапазоне
var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Создаем функцию по генерации комментария
var getComment = function (numbers) {
  var commentsArr = [];
  for (var i = 1; i <= numbers; i++) {
    var comment = {
      avatar: 'img/avatar-' + getRandom(MIN_AVATARS, MAX_AVATARS) + '.svg',
      message: getMessages(getRandom(MIN_COMMENTS, MAX_COMMENTS)),
      name: names[getRandom(0, names.length - 1)],
    };
    commentsArr.push(comment);
  }
  return commentsArr;
};

// Создаем функцию генерации фото в массив
var getPhotos = function (photos) {
  for (var i = 1; i <= photos; i++) {
    var mock = {
      url: 'photos/' + [i] + '.jpg',
      description: 'Описание фотографии',
      likes: getRandom(MIN_LIKES, MAX_LIKES),
      comments: getComment(getRandom(MIN_COMMENTS, MAX_COMMENTS)),
    };
    mockArr.push(mock);
  }
  return mockArr;
};

// Функция создания мага ( рендеринг комментария,лайков и т.д )
var renderPhoto = function (photo) {
  var photoElement = photoTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__img').alt = photo.description;
  photoElement.querySelector('.picture__comments').textContent = photo.likes;
  photoElement.querySelector('.picture__likes').textContent = photo.comments;


  return photoElement;
};

// Отрисуем список фото на странице
var getPhotoList = function (array) {
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderPhoto(array[i]));
  }
  photoListElement.appendChild(fragment);
};

getPhotos(NUMBER_OF_PHOTOS);
getPhotoList(mockArr);
