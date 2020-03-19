'use strict';
(function () {

  // Максимальный процент
  var MAX_FILTER_INTENSITY = 100;

  // Находим поля хештегов
  var inputElement = document.querySelector('.text__hashtags');
  var descriptionElement = document.querySelector('.text__description');

  // Находим список эффектов и инпуты фильтров
  var effectsListElement = document.querySelector('.effects__list');
  var effectInputElements = effectsListElement.querySelectorAll('.effects__radio');

  // Находим контейнер слайдера и поле значений слайдера
  var sliderBoxElement = document.querySelector('.img-upload__effect-level');
  var sliderEffectInputElement = document.querySelector('.effect-level__value');

  // Находим фото-превью
  var previewImgElement = document.querySelector('.img-upload__preview').firstElementChild;

  // Находим ползунок и контейнер,в котором он движется + заливку полозка
  var sliderLineElement = document.querySelector('.effect-level__line');
  var sliderPinElement = document.querySelector('.effect-level__pin');
  var effectLevelDepthElement = sliderLineElement.querySelector('.effect-level__depth');

  // Ограничение пина по координатам
  var MoveRestriction = {
    COORDS_MIN_X: 1,
    COORDS_MAX_X: 453,
  };

  // Создаем массив фильтров(эффектов) для формы
  var filters = {
    chrome: {
      className: 'effects__preview--chrome',
      filterName: 'grayscale',
      minValue: 0,
      maxValue: 1,
      getIntensity: function (percent) {
        // Значение фильтра в числовом эквиваленте для вставки в стили
        return (this.filterName + '(' + (this.minValue + (this.maxValue - this.minValue) * percent / 100) + ')');
      },
    },
    sepia: {
      className: 'effects__preview--sepia',
      filterName: 'sepia',
      minValue: 0,
      maxValue: 1,
      getIntensity: function (percent) {
        return (this.filterName + '(' + (this.minValue + (this.maxValue - this.minValue) * percent / 100) + ')');
      },
    },
    marvin: {
      className: 'effects__preview--marvin',
      filterName: 'invert',
      minValue: 0,
      maxValue: 100,
      getIntensity: function (percent) {
        return (this.filterName + '(' + (this.minValue + (this.maxValue - this.minValue) * percent / 100) + '%)');
      },
    },
    phobos: {
      className: 'effects__preview--phobos',
      filterName: 'blur',
      minValue: 0,
      maxValue: 3,
      getIntensity: function (percent) {
        return (this.filterName + '(' + (this.minValue + (this.maxValue - this.minValue) * percent / 100) + 'px)');
      },
    },
    heat: {
      className: 'effects__preview--heat',
      filterName: 'brightness',
      minValue: 1,
      maxValue: 3,
      getIntensity: function (percent) {
        return (this.filterName + '(' + (this.minValue + (this.maxValue - this.minValue) * percent / 100) + ')');
      },
    },
  };

  // Создаем переменную текущего фильтра
  var currentFilter = null;

  // Функция переключения нужного фильтра
  var applyFilter = function (input) {
    if (currentFilter) {
      previewImgElement.classList.remove(currentFilter.className);
    }

    // Текущий фильтр ставим из значения чекбокса
    currentFilter = filters[input.value];

    sliderPinElement.style.left = MoveRestriction.COORDS_MAX_X + 'px';
    effectLevelDepthElement.style.width = MAX_FILTER_INTENSITY + '%';

    if (currentFilter) {
      sliderBoxElement.style.display = 'block';
      previewImgElement.style.filter = currentFilter.getIntensity(MAX_FILTER_INTENSITY);
      previewImgElement.classList.add(currentFilter.className);
      sliderEffectInputElement.value = MAX_FILTER_INTENSITY;
    } else {
      sliderBoxElement.style.display = 'none';
      previewImgElement.style.filter = 'none';
    }
  };

  // Функция добавления обработчиков для смены фильтра
  var addEffectListeners = function (effectInputs) {
    for (var i = 0; i < effectInputs.length; i++) {
      effectInputs[i].addEventListener('change', function (evt) {
        applyFilter(evt.target);
      });
    }
  };

  addEffectListeners(effectInputElements);

  // Обработчик формы для перемещения ползунка и установки эффекта насыщенности согласно значению ползунка
  sliderPinElement.addEventListener('mousedown', function (evt) {
    var value = 0;

    // Находим координаты нажатия мыши
    var startCoords = {
      x: evt.clientX,
    };

    var mouseMoveHandler = function (moveEvt) {
      // Находим координаты движения ( стартовые - нынешние )
      var shift = {
        x: startCoords.x - moveEvt.clientX,
      };

      // Перезаписываем стартовые
      startCoords.x = moveEvt.clientX;

      if (((sliderPinElement.offsetLeft - shift.x) > MoveRestriction.COORDS_MIN_X) && ((sliderPinElement.offsetLeft - shift.x) < MoveRestriction.COORDS_MAX_X)) {
        sliderPinElement.style.left = (sliderPinElement.offsetLeft - shift.x) + 'px';

        value = sliderPinElement.offsetLeft - shift.x;
        var valueSlider = Math.ceil((value * 100 / MoveRestriction.COORDS_MAX_X)); // Значение пина в процентах
        effectLevelDepthElement.style.width = valueSlider + '%'; // Значение заливки

        previewImgElement.style.filter = currentFilter.getIntensity(valueSlider); // Ставим значение фильтра
        sliderEffectInputElement.value = valueSlider;
      }
    };

    var mouseUpHandler = function () {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  var reset = function () {
    sliderPinElement.style.left = MoveRestriction.COORDS_MAX_X + 'px';
    effectLevelDepthElement.style.width = MAX_FILTER_INTENSITY + '%';
    previewImgElement.style.filter = 'none';
    if (currentFilter) {
      previewImgElement.classList.remove(currentFilter.className);
    }
    sliderBoxElement.style.display = 'none';
    currentFilter = null;
    effectInputElements[0].checked = true;
    inputElement.value = '';
    descriptionElement.value = '';
    inputElement.style.borderColor = 'rgb(238, 238, 238)';
  };

  // Для передачи в другие модули
  window.effects = {
    toDefault: reset,
  };
})();
