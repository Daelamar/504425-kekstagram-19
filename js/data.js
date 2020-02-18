'use strict';
(function () {
  // Максимальное и минимальное значение адреса у аватара
  var MIN_AVATARS = 1;
  var MAX_AVATARS = 6;

  // Максимальное и минимальное колличество комментариев к фотографии
  var MIN_COMMENTS = 1;
  var MAX_COMMENTS = 2;

  // Максимальное и минимальное значение лайков
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;

  // Колличество фото на странице
  var NUMBER_OF_PHOTOS = 25;

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

  // Функция получения случайного сообщения в комментарий
  var getMessages = function (number) {
    var message = [];
    for (var i = 1; i <= number; i++) {
      message.push(window.utils.getRandomItem(messagesArray));
    }
    return message.join(' ');
  };

  // Функция получения (создания) комментария
  var getComment = function (number) {
    var commentsArray = [];
    for (var i = 1; i <= number; i++) {
      var comment = {
        avatar: 'img/avatar-' + window.utils.getRandomNumber(MIN_AVATARS, MAX_AVATARS) + '.svg',
        message: getMessages(window.utils.getRandomNumber(MIN_COMMENTS, MAX_COMMENTS)),
        name: window.utils.getRandomItem(namesArray),
      };
      commentsArray.push(comment);
    }
    return commentsArray;
  };

  // Создаем функцию генерации маленьких фото и добавления их в массив
  var createPhotoArray = function (number) {
    var photoArray = [];
    for (var i = 1; i <= number; i++) {
      var photo = {
        url: 'photos/' + [i] + '.jpg',
        description: 'Описание фотографии',
        likes: window.utils.getRandomNumber(MIN_LIKES, MAX_LIKES),
        comments: getComment(window.utils.getRandomNumber(MIN_COMMENTS, MAX_COMMENTS)),
      };
      photoArray.push(photo);
    }
    return photoArray;
  };

  // Сохраняем массив из 25 фотографий
  var photosArray = createPhotoArray(NUMBER_OF_PHOTOS);

  console.log(photosArray);

  // Для передачи в другие модули
  window.data = {
    photosArray: photosArray,
  };
})();
