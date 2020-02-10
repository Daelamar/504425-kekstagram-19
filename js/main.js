'use strict';

var ESC_KEY = 27;
var ENTER_KEY = 13;

var MAX_HASHTAGS_VALUE = 5;
var MAX_DIGITS_HASHTAG = 20;

// Минимальный и максимальный размеры фото-превью
var MIN_SCALE = 25;
var MAX_SCALE = 100;
var STEP = 25;

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

// Находим кнопки размера фотографии и поле для значения, так же саму фото-превью
var smallerScaleButtonElement = changePhotoFormElement.querySelector('.scale__control--smaller');
var biggerScaleButtonElement = changePhotoFormElement.querySelector('.scale__control--bigger');
var scaleValueElement = changePhotoFormElement.querySelector('.scale__control--value');
var previewImgElement = document.querySelector('.img-upload__preview').firstElementChild;

// Находим список эффектов и инпуты фильтров
var effectsListElement = document.querySelector('.effects__list');
var effectInputsArray = effectsListElement.querySelectorAll('.effects__radio');
// var formElement = document.querySelector('.img-upload__form');

// Находим контейнер слайдера и поле значений слайдера
var sliderBoxElement = document.querySelector('.img-upload__effect-level');
var sliderEffectInputElement = document.querySelector('.effect-level__value');

// Находим ползунок и контейнер,в котором он движется
var sliderLineElement = document.querySelector('.effect-level__line');
var sliderPinElement = document.querySelector('.effect-level__pin');

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

// Создаем массив фильтров(эффектов) для формы
var filters = [
  {
    name: 'none',
    class: 'effects__preview--none',
    filterName: '',
    valueIntensity: function () {
      return ('filter:' + '');
    },
  },
  {
    name: 'chrome',
    class: 'effects__preview--chrome',
    filterName: 'grayscale',
    minValue: 0,
    maxValue: 1,
    valueIntensity: function (value) {
      return (this.filterName + '(' + value + ')');
    },
  },
  {
    name: 'sepia',
    class: 'effects__preview--sepia',
    filterName: 'sepia',
    minValue: 0,
    maxValue: 1,
    valueIntensity: function (value) {
      return (this.filterName + '(' + value + ')');
    },
  },
  {
    name: 'marvin',
    class: 'effects__preview--marvin',
    filterName: 'invert',
    minValue: 0,
    maxValue: 100,
    valueIntensity: function (value) {
      return (this.filterName + '(' + value + '%)');
    },
  },
  {
    name: 'phobos',
    class: 'effects__preview--phobos',
    filterName: 'blur',
    minValue: 0,
    maxValue: 3,
    valueIntensity: function (value) {
      return (this.filterName + '(' + value + 'px)');
    },
  },
  {
    name: 'heat',
    class: 'effects__preview--heat',
    filterName: 'brightness',
    minValue: 1,
    maxValue: 3,
    valueIntensity: function (value) {
      return (this.filterName + '(' + value + ')');
    },
  },
];

// Создаем переменную текущего фильтра
var currentFilter = filters[0];

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
  if (evt.keyCode === ESC_KEY) {
    hideFormHandler();
  }
};

// Функция закрытия окна формы
var hideFormHandler = function () {
  changePhotoFormElement.classList.add('hidden');
  document.removeEventListener('keydown', onEscCloseFormHandler);
  body.classList.remove('modal-open');
  resetForm();
};

// Функция открытия окна формы
var showFormHandler = function () {
  changePhotoFormElement.classList.remove('hidden');
  addEffectListeners(effectInputsArray);
  scaleValueElement.value = MAX_SCALE + '%';
  document.addEventListener('keydown', onEscCloseFormHandler);
  sliderBoxElement.style.display = 'none';
  body.classList.add('modal-open');
};

// Функция переключения нужного фильтра
var applyFilter = function (input) {
  previewImgElement.classList.remove(currentFilter.class);

  for (var i = 0; i < filters.length; i++) {
    if (input.value === filters[i].name) {
      currentFilter = filters[i];
    }
  }

  previewImgElement.classList.add(currentFilter.class);
  previewImgElement.style.filter = currentFilter.valueIntensity(currentFilter.maxValue);
  sliderEffectInputElement.value = currentFilter.maxValue;

  if (currentFilter.name === 'none') {
    sliderBoxElement.style.display = 'none';
  } else {
    sliderBoxElement.style.display = 'block';
  }
};

// Функция добавления обработчиков для смены класса при смене фильтра
var changeEffectPhoto = function (input) {
  input.addEventListener('change', function () {
    applyFilter(input);
  });
};

// Функция  с циклом добавления обработчиков на кнопки смены эффекта через функцию
var addEffectListeners = function (array) {
  var index;
  for (var i = 0; i < array.length; i++) {
    index = array[i];
    changeEffectPhoto(index);
  }
};

// Функция уменьшения размера фото-превью
var smallerPreviewImgHandler = function () {
  var scale = parseInt(scaleValueElement.value, 10);
  if (scale > MIN_SCALE) {
    previewImgElement.style.transform = 'scale(' + (scale - STEP) / 100 + ')';
    scaleValueElement.value = (scale - STEP) + '%';
  }
};

// Функция увеличения размера фото-превью
var biggerPreviewImgHandler = function () {
  var scale = parseInt(scaleValueElement.value, 10);
  if (scale < MAX_SCALE) {
    previewImgElement.style.transform = 'scale(' + (scale + STEP) / 100 + ')';
    scaleValueElement.value = (scale + STEP) + '%';
  }
};

// Функция сброса данных формы
var resetForm = function () {
  scaleValueElement.value = MAX_SCALE + '%';
  previewImgElement.style.transform = '';
  previewImgElement.classList = '';
  uploadFieldElement.value = '';
  previewImgElement.style.filter = currentFilter.valueIntensity(currentFilter.maxValue);
};

// Функция проверки на валидность
var hashtagsFieldValidity = function () {
  var pattern = /^[a-zA-Z0-9#]+$/; // Паттерн значений
  var hashtagValue = hashtagsFieldElement.value.toLowerCase(); // Приводим массив к строчным буквам
  var checkedArray = hashtagValue.split(/\s+/); // Сепаратор - пробел или два
  var uniqeHashtags = []; // Массив для проверки на дубли

  if (checkedArray.length > MAX_HASHTAGS_VALUE) {
    hashtagsFieldElement.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
  }

  for (var i = 0; i < checkedArray.length; i++) {
    var hashtag = checkedArray[i];

    if (hashtag.length === 1 && hashtag.charAt(0) === '') {
      hashtagsFieldElement.setCustomValidity('Хеш-теги должны быть разделены только одним пробелом');
      return;
    } else if (hashtag.length === 1 && hashtag.charAt(0) === '#') {
      hashtagsFieldElement.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
      return;
    } else if (hashtag.length > MAX_DIGITS_HASHTAG) {
      hashtagsFieldElement.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
      return;
    } else if (hashtag.charAt(0) !== '#') {
      hashtagsFieldElement.setCustomValidity('Хеш-тег должен начинаться с символа #');
      return;
    } else if (pattern.test(hashtag) === false) {
      hashtagsFieldElement.setCustomValidity('Хеш-тег должен состоять из букв и чисел и не может содержать спецсимволы (@, $ и т.п.)');
      return;
    } else if (uniqeHashtags.includes(hashtag) === true) {
      hashtagsFieldElement.setCustomValidity('Не может быть два одинаковых хеш-тега');
      return;
    } else {
      hashtagsFieldElement.setCustomValidity('');
    }

    uniqeHashtags.push(hashtag);
  }
  console.log(uniqeHashtags);
};

renderPhotoList(photosArray);
// showBigPicture(photosArray[0]);

// Обработчики на поля
uploadFieldElement.addEventListener('change', showFormHandler);
smallerScaleButtonElement.addEventListener('click', smallerPreviewImgHandler);
biggerScaleButtonElement.addEventListener('click', biggerPreviewImgHandler);

closeFormButtonElement.addEventListener('click', hideFormHandler);
closeFormButtonElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY) {
    hideFormHandler();
  }
});
// Обработчики на поля формы для прекращения всплытия
hashtagsFieldElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEY) {
    evt.stopPropagation();
  }
});
descriptionFieldElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEY) {
    evt.stopPropagation();
  }
});

hashtagsFieldElement.addEventListener('input', hashtagsFieldValidity);

sliderLineElement.addEventListener('mouseup', function (evt) {
  var lineCoords = sliderLineElement.getBoundingClientRect(); // Линия, по которой передвигается пин
  var lineCoordsWidth = lineCoords.width; // Ширина линии
  var lineCoordsStart = lineCoords.left; // Начало линии

  var pinCoordX = evt.clientX; // Ловим координаты клика
  var onePercent = ((lineCoordsStart + lineCoordsWidth) - lineCoordsStart) / 100; // Высчитываем 1% от длинны линии

  var valueSlider = Math.floor((pinCoordX - lineCoordsStart) / onePercent); // Значение пина в процентах
  var valueFilter = currentFilter.minValue + (currentFilter.maxValue - currentFilter.minValue) * valueSlider / 100; // Значение фильтра в числовом эквиваленте

  previewImgElement.style.filter = currentFilter.valueIntensity(valueFilter); // Ставим значение фильтра
});
