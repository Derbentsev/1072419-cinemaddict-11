const MonthNamesShort = [
  `Jan`,
  `Feb`,
  `Mar`,
  `Apr`,
  `May`,
  `Jun`,
  `Jul`,
  `Aug`,
  `Sep`,
  `Oct`,
  `Nov`,
  `Dec`,
];


/**
 * Создаем пустой элемент div и в него вкладываем вёрстку
 * @param {string} template - Вёрстка
 * @return {string} DOM-элемент
 */
const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

/**
 * Выбирает случайное ЦЕЛОЕ число из заданного промежутка
 * @param {number} min - Минимально возможное число
 * @param {number} max - Максимальное число
 * @return {number} - Случайное ЦЕЛОЕ число
 */
const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

/**
 * Выбирает из массива случайный элемент
 * @param {array} array - Массив любой величины
 * @return {object} - Случайный элемент массива
 */
const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

/**
 * Преобразует минуты в формат `1h 36m`
 * @param {number} value - Количество минут
 * @return {string} Строка в формате `1h 36m`
 */
const castTimeFormat = (value) => {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;

  return `${hours}h ${minutes}m`;
};

/**
 * Возвращает перечисление случайных элементов массива
 * @param {array} array - Массив строк
 * @param {number} count - Число элементов
 * @return {string} - Перечисление случайных элементов массива через запятую
 */
const getRandomArrayItems = (array, count) => {
  let newArray = [];

  for (let i = 0; i < count; i++) {
    newArray.push(array[getRandomIntegerNumber(0, array.length)]);
  }

  return newArray.join(`, `);
};

/**
 * Выбирает случайное ДЕСЯТИЧНОЕ число из заданного промежутка
 * @param {number} min - Минимально возможное число
 * @param {number} max - Максимальное число
 * @return {number} - Случайное ДЕСЯТИЧНОЕ число
 */
const getRandomFloatNumber = (min, max) => {
  return (min + (Math.random() * (max - min))).toFixed(1);
};

/**
 * Генерируем случайную дату внутри заданного промежутка
 * @param {date} dateStart - Минимально возможная дата
 * @param {date} dateEnd - Максимально возможная дата
 * @return {string} - Случайная дата
 */
const getRandomDate = (dateStart, dateEnd) => {
  const randomDate = new Date(dateStart.getTime() + Math.random() * (dateEnd.getTime() - dateStart.getTime()));
  return randomDate.getDate() + ` ` + MonthNamesShort[randomDate.getMonth()] + ` ` + randomDate.getFullYear();
};


export {
  getRandomArrayItem,
  getRandomIntegerNumber,
  castTimeFormat,
  getRandomArrayItems,
  getRandomFloatNumber,
  getRandomDate,
  createElement,
};
