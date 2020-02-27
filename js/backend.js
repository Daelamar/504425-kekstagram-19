'use strict';
(function () {
  // Адресс сервера, на который должны отправиться данные
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';
  var URL_DOWNLOAD = 'https://js.dump.academy/kekstagram/data';

  // Значение времени ожидания
  var TIMEOUT = 10000;

  // Коды ошибок сервера
  var ServerCodes = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  };

  var setupHttpRequest = function (onSuccess, onError) {
    // Создаём новый XMLHttpRequest-объект
    var xhr = new XMLHttpRequest();
    // Указываем ему тип данных
    xhr.responseType = 'json';

    // Вешаем обработчик на событие загрузки для отображения ошибок
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case ServerCodes.SUCCESS:
          onSuccess(xhr.response);
          break;
        case ServerCodes.BAD_REQUEST:
          onError('Ошибка ' + xhr.status + ' , некорректный запрос!');
          break;
        case ServerCodes.FORBIDDEN:
          onError('Ошибка ' + xhr.status + ' , отказано в доступе!');
          break;
        case ServerCodes.NOT_FOUND:
          onError('Ошибка ' + xhr.status + ' , страница не найдена!');
          break;
        case ServerCodes.INTERNAL_SERVER_ERROR:
          onError('Ошибка : ' + xhr.status + ' , внутренняя ошибка сервера!');
          break;
        default:
          onError('Ошибка : ' + xhr.status + '' + xhr.statusText);
      }
    });

    // Обработчики для ошибки и таймаута
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения!');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' секунд!');
    });

    // Указываем таймаут
    xhr.timeout = TIMEOUT;

    // Возвращаем XMLHttpRequest-объект для дальнейшего использования
    return xhr;
  };

  var downloadData = function (onSuccess, onError) {
    var xhr = setupHttpRequest(onSuccess, onError);

    // Инициируем запрос
    xhr.open('GET', URL_DOWNLOAD);

    // Отправляем
    xhr.send();
  };

  var uploadData = function (data, onSuccess, onError) {
    var xhr = setupHttpRequest(onSuccess, onError);

    // Инициируем запрос
    xhr.open('POST', URL_UPLOAD);

    // Отправляем
    xhr.send(data);
  };

  // Для передачи в другие модули
  window.backend = {
    load: downloadData,
    save: uploadData
  };
})();
