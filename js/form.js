'use strict';
(function () {
  var MAX_HASHTAGS_VALUE = 5;
  var MAX_DIGITS_HASHTAG = 20;

  var body = document.querySelector('body');

  // Минимальный и максимальный размеры фото-превью в форме + шаг для масштаба
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var STEP = 25;

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
  // var sliderPinElement = document.querySelector('.effect-level__pin');

  // Создаем массив фильтров(эффектов) для формы
  var filters = [
    {
      name: 'none',
      class: 'effects__preview--none',
    },
    {
      name: 'chrome',
      class: 'effects__preview--chrome',
      filterName: 'grayscale',
      minValue: 0,
      maxValue: 1,
      defaultPercentage: 100,
      getIntensity: function (percent) {
        // Значение фильтра в числовом эквиваленте для вставки в стили
        return (this.filterName + '(' + (this.minValue + (this.maxValue - this.minValue) * percent / 100) + ')');
      },
      getIntensityValue: function (percent) {
        // Значение фильтра для значения в инпут
        return (this.minValue + (this.maxValue - this.minValue) * percent / 100);
      },
    },
    {
      name: 'sepia',
      class: 'effects__preview--sepia',
      filterName: 'sepia',
      minValue: 0,
      maxValue: 1,
      defaultPercentage: 100,
      getIntensity: function (percent) {
        return (this.filterName + '(' + (this.minValue + (this.maxValue - this.minValue) * percent / 100) + ')');
      },
      getIntensityValue: function (percent) {
        return (this.minValue + (this.maxValue - this.minValue) * percent / 100);
      },
    },
    {
      name: 'marvin',
      class: 'effects__preview--marvin',
      filterName: 'invert',
      minValue: 0,
      maxValue: 100,
      defaultPercentage: 100,
      getIntensity: function (percent) {
        return (this.filterName + '(' + (this.minValue + (this.maxValue - this.minValue) * percent / 100) + '%)');
      },
      getIntensityValue: function (percent) {
        return (this.minValue + (this.maxValue - this.minValue) * percent / 100);
      },
    },
    {
      name: 'phobos',
      class: 'effects__preview--phobos',
      filterName: 'blur',
      minValue: 0,
      maxValue: 3,
      defaultPercentage: 100,
      getIntensity: function (percent) {
        return (this.filterName + '(' + (this.minValue + (this.maxValue - this.minValue) * percent / 100) + 'px)');
      },
      getIntensityValue: function (percent) {
        return (this.minValue + (this.maxValue - this.minValue) * percent / 100);
      },
    },
    {
      name: 'heat',
      class: 'effects__preview--heat',
      filterName: 'brightness',
      minValue: 1,
      maxValue: 3,
      defaultPercentage: 100,
      getIntensity: function (percent) {
        return (this.filterName + '(' + (this.minValue + (this.maxValue - this.minValue) * percent / 100) + ')');
      },
      getIntensityValue: function (percent) {
        return (this.minValue + (this.maxValue - this.minValue) * percent / 100);
      },
    },
  ];

  // Создаем переменную текущего фильтра
  var currentFilter = filters[0];

  // Функция закрытия окна формы по нажатию ESC
  var onEscCloseFormHandler = function (evt) {
    if (evt.keyCode === window.util.ESC_KEY) {
      hideFormHandler();
    }
  };

  // Функция закрытия окна формы
  var hideFormHandler = function () {
    changePhotoFormElement.classList.add('hidden');
    document.removeEventListener('keydown', onEscCloseFormHandler);
    body.classList.remove('modal-open');
  };

  // Функция открытия окна формы
  var showFormHandler = function () {
    resetForm();
    changePhotoFormElement.classList.remove('hidden');
    document.addEventListener('keydown', onEscCloseFormHandler);
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

    if (currentFilter.name === 'none') {
      sliderBoxElement.style.display = 'none';
      previewImgElement.style.filter = 'none';
    } else {
      sliderBoxElement.style.display = 'block';
      previewImgElement.style.filter = currentFilter.getIntensity(currentFilter.defaultPercentage);
    }

    previewImgElement.classList.add(currentFilter.class);
    sliderEffectInputElement.value = currentFilter.maxValue;
  };

  // Функция добавления обработчиков для смены фильтра
  var addEffectListeners = function (effectInputs) {
    for (var i = 0; i < effectInputs.length; i++) {
      effectInputs[i].addEventListener('change', function (evt) {
        applyFilter(evt.target);
      });
    }
  };

  addEffectListeners(effectInputsArray);

  // Функция уменьшения размера фото-превью в форме
  var smallerPreviewImgHandler = function () {
    var scale = parseInt(scaleValueElement.value, 10);
    if (scale > MIN_SCALE) {
      previewImgElement.style.transform = 'scale(' + (scale - STEP) / 100 + ')';
      scaleValueElement.value = (scale - STEP) + '%';
    }
  };

  // Функция увеличения размера фото-превью в форме
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
    previewImgElement.style.transform = 'none';
    previewImgElement.style.filter = 'none';
    previewImgElement.classList = 'none';
    sliderBoxElement.style.display = 'none';
    uploadFieldElement.value = '';
    currentFilter = filters[0];
  };

  // Функция проверки формы на валидность
  var hashtagsFieldValidity = function () {
    var pattern = /^[a-zA-Z0-9#]+$/; // Паттерн значений
    var hashtagValue = hashtagsFieldElement.value.toLowerCase(); // Приводим массив к строчным буквам
    var checkedArray = hashtagValue.split(/\s+/); // Сепаратор - пробел или два
    var uniqueHashtags = []; // Массив для проверки на дубли

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
      } else if (uniqueHashtags.includes(hashtag) === true) {
        hashtagsFieldElement.setCustomValidity('Не может быть два одинаковых хеш-тега');
        return;
      } else {
        hashtagsFieldElement.setCustomValidity('');
      }

      uniqueHashtags.push(hashtag);
    }
  };

  // Обработчики на поля формы (закрытие, открытие, изменение масштаба )
  uploadFieldElement.addEventListener('change', showFormHandler);
  smallerScaleButtonElement.addEventListener('click', smallerPreviewImgHandler);
  biggerScaleButtonElement.addEventListener('click', biggerPreviewImgHandler);

  closeFormButtonElement.addEventListener('click', hideFormHandler);
  closeFormButtonElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEY) {
      hideFormHandler();
    }
  });

  // Обработчики на поля формы для прекращения всплытия
  hashtagsFieldElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ESC_KEY) {
      evt.stopPropagation();
    }
  });
  descriptionFieldElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ESC_KEY) {
      evt.stopPropagation();
    }
  });

  // Обработчик формы для проверки на валидность
  hashtagsFieldElement.addEventListener('input', hashtagsFieldValidity);

  // Обработчик формы для установки эффекта насыщенности согласно значению ползунка
  sliderLineElement.addEventListener('mouseup', function (evt) {
    var lineCoords = sliderLineElement.getBoundingClientRect(); // Линия, по которой передвигается пин
    var onePercent = lineCoords.width / 100; // Высчитываем 1% от длинны линии
    var valueSlider = Math.floor((evt.clientX - lineCoords.left) / onePercent); // Значение пина в процентах
    previewImgElement.style.filter = currentFilter.getIntensity(valueSlider); // Ставим значение фильтра
    sliderEffectInputElement.value = currentFilter.getIntensityValue(valueSlider);
  });
})();
