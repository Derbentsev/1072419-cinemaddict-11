import {
  getRandomArrayItem,
  getRandomIntegerNumber
} from '../utils.js';


const MIN_DURATION_MINUTES = 60;
const MAX_DURATION_MINUTES = 180;
const MIN_RELEASE_YEAR = 1917;
const MAX_RELEASE_YEAR = 2020;
const MIN_RATING = 0;
const MAX_RATING = 10;

const FilmNames = [
  `Film name 1`,
  `Film name 2`,
  `Film name 3`,
];

const Posters = [
  `popeye-meets-sinbad.png`,
  `made-for-each-other.png`,
  `sagebrush-trail.jpg`,
];

const Descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.`,
  `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
];

const Genre = [
  `horror`,
  `comedy`,
  `drama`,
];


/**
 * Выбирает случайное ДЕСЯТИЧНОЕ число из заданного промежутка
 * @param {number} min - Минимально возможное число
 * @param {number} max - Максимальное число
 * @return {number} - Случайное ДЕСЯТИЧНОЕ число
 */
const getRandomFloatNumber = (min, max) => {
  return min + (Math.random() * (max - min));
};

/**
 * Преобразуем минуты в формат `1h 36m`
 * @param {number} value - Количество минут
 * @return {string} Строка в формате `1h 36m`
 */
const castTimeFormat = (value) => {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;

  return `${hours}h ${minutes}m`;
};

/**
 * Генерируем новый фильм
 * @return {object} - Случайно сгенерированный фильм
 */
const generateFilm = () => {
  return {
    name: getRandomArrayItem(FilmNames),
    poster: `./images/posters/` + getRandomArrayItem(Posters),
    rating: getRandomFloatNumber(MIN_RATING, MAX_RATING),
    releaseYear: getRandomIntegerNumber(MIN_RELEASE_YEAR, MAX_RELEASE_YEAR),
    duration: castTimeFormat(getRandomIntegerNumber(MIN_DURATION_MINUTES, MAX_DURATION_MINUTES)),
    genre: getRandomArrayItem(Genre),
    description: getRandomArrayItem(Descriptions),
    commentsNumber: `5`,
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {
  generateFilms
};
