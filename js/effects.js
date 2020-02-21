'use strict';
(function () {
  // Максимальный процент
  var MAX_FILTER_INTENSITY = 100;

  // Находим список эффектов и инпуты фильтров
  var effectsListElement = document.querySelector('.effects__list');
  var effectInputsArray = effectsListElement.querySelectorAll('.effects__radio');

  // Находим контейнер слайдера и поле значений слайдера
  var sliderBoxElement = document.querySelector('.img-upload__effect-level');
  var sliderEffectInputElement = document.querySelector('.effect-level__value');

  // Находим фото-превью
  var previewImgElement = document.querySelector('.img-upload__preview').firstElementChild;

  // Находим ползунок и контейнер,в котором он движется
  var sliderLineElement = document.querySelector('.effect-level__line');
  // var sliderPinElement = document.querySelector('.effect-level__pin');

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

  addEffectListeners(effectInputsArray);

  // Обработчик формы для установки эффекта насыщенности согласно значению ползунка
  sliderLineElement.addEventListener('mouseup', function (evt) {
    var lineCoords = sliderLineElement.getBoundingClientRect(); // Линия, по которой передвигается пин
    var onePercent = lineCoords.width / 100; // Высчитываем 1% от длинны линии
    var valueSlider = Math.floor((evt.clientX - lineCoords.left) / onePercent); // Значение пина в процентах
    previewImgElement.style.filter = currentFilter.getIntensity(valueSlider); // Ставим значение фильтра
    sliderEffectInputElement.value = valueSlider;
  });

  var resetEffects = function () {
    previewImgElement.style.filter = 'none';
    previewImgElement.classList = '';
    sliderBoxElement.style.display = 'none';
    currentFilter = null;
  };

  // Для передачи в другие модули
  window.effects = {
    toDefault: resetEffects,
  };
})();
