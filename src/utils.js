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

export {
  getRandomArrayItem,
  getRandomIntegerNumber
};
