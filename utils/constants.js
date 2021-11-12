// ПРОВЕРКА СИМВОЛОВ ИМЕНИ
const nameRegExp = /^([a-zA-Z]){2,30}$|^([а-яА-Я]){2,30}$/;

// ПОЛУЧЕНИЕ ТЕКУЩЕЙ ДАТЫ И ВРЕМЕНИ В УДОБНОМ ФОРМАТЕ
// date: 15.07.2021, time: 14:21:35
const currentDate = function comfortDate() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  function pasteZero(number) {
    return number < 10 ? `0${number}` : number;
  }

  return `${pasteZero(day)}-${pasteZero(month)}-${pasteZero(year)}, ${pasteZero(hours)}:${pasteZero(minutes)}:${pasteZero(seconds)}`;
};

const needAuth = 'Вам необходимо авторизоваться для получения доступа к ресурсу';

const successfulLogout = 'Вы успешно вышли из системы';

const successfulAuth = 'Авторизация прошла успешно';

const successfulReg = 'Регистрация прошла успешно';

const userWithEmailAlreadyExists = 'Пользователь с таким email уже существует';

const cardDoesNotExist = 'Такой карточки на сервере не существует';

const notOwnerThisCard = 'Вы не являетесь владельцем этой карточки';

const tooManyRequests = 'С вашего IP поступило слишком много запросов. Попробуйте повторить попытку через 1 час.';

const linkImageNotValid = 'Ссылка на изображение невалидна';

const emailOrPasswordIncorrect = 'Неправильные почта или пароль';

const notFoundPage = 'Такой страницы не нашлось';

const requestCanNotBeExecutedServer = 'Данный запрос не может быть выполнен сервером';

module.exports = {
  nameRegExp,
  currentDate,
  needAuth,
  successfulLogout,
  userWithEmailAlreadyExists,
  successfulAuth,
  successfulReg,
  cardDoesNotExist,
  notOwnerThisCard,
  tooManyRequests,
  linkImageNotValid,
  emailOrPasswordIncorrect,
  notFoundPage,
  requestCanNotBeExecutedServer,
};
