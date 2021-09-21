// ПРОВЕРКА КОРРЕКТНОСТИ СИНТАКСИСА ССЫЛКИ НА ИЗОБРАЖЕНИЕ
module.exports.urlRegExp = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/;

// ПРОВЕРКА EMAIL
module.exports.emailRegExp = /^(([-.]?([a-zA-Z0-9])[_]?)+)@([a-zA-Z0-9]+(-)?[a-zA-Z0-9]+)+\.([a-z]+)$/;

// ПРОВЕРКА СИМВОЛОВ ИМЕНИ
module.exports.nameRegExp = /^([a-zA-Z]){2,30}$|^([а-яА-Я]){2,30}$/;

// ПОЛУЧЕНИЕ ТЕКУЩЕЙ ДАТЫ И ВРЕМЕНИ В УДОБНОМ ФОРМАТЕ
// date: 15.07.2021, time: 14:21:35
module.exports.currentDate = function comfortDate() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  function pasteZero(number) {
    // eslint-disable-next-line prefer-template
    return number < 10 ? '0' + number : number;
  }

  return `${pasteZero(day)}-${pasteZero(month)}-${pasteZero(year)}, ${pasteZero(hours)}:${pasteZero(minutes)}:${pasteZero(seconds)}`;
};
