import {
  getRandomArrayItem,
  getRandomIntegerNumber,
  castTimeFormat,
  getRandomFloatNumber
} from '../utils.js';

import {
  MIN_RATING,
  MAX_RATING,
  MIN_DURATION_MINUTES,
  MAX_DURATION_MINUTES,
  FilmNames,
  Posters,
  Genre,
  Descriptions
} from '../consts.js';


const MIN_RELEASE_YEAR = 1917;
const MAX_RELEASE_YEAR = 2020;
const MIN_COMMENTS = 1;
const MAX_COMMENTS = 30;


/**
 * Генерируем новый фильм
 * @return {object} - Случайно сгенерированный фильм
 */
const generateFilm = () => {
  return {
    name: getRandomArrayItem(FilmNames),
    poster: getRandomArrayItem(Posters),
    rating: getRandomFloatNumber(MIN_RATING, MAX_RATING),
    releaseYear: getRandomIntegerNumber(MIN_RELEASE_YEAR, MAX_RELEASE_YEAR),
    duration: castTimeFormat(getRandomIntegerNumber(MIN_DURATION_MINUTES, MAX_DURATION_MINUTES)),
    genre: getRandomArrayItem(Genre),
    description: getRandomArrayItem(Descriptions),
    commentsNumber: getRandomIntegerNumber(MIN_COMMENTS, MAX_COMMENTS),
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
