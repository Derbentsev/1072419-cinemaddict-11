import {
  getRandomArrayItem,
  getRandomIntegerNumber,
  castTimeFormat,
  getRandomFloatNumber,
  getRandomArrayItems,
  getRandomDate,
} from '../utils.js';

import {
  MIN_RATING,
  MAX_RATING,
  MIN_DURATION_MINUTES,
  MAX_DURATION_MINUTES,
  FilmNames,
  Posters,
  Genre,
  Descriptions,
} from '../consts.js';


const MIN_RELEASE_YEAR = 1917;
const MAX_RELEASE_YEAR = 2020;
const MIN_COMMENTS = 1;
const MAX_COMMENTS = 30;


const AgeRatings = [
  `0+`,
  `6+`,
  `12+`,
  `18+`,
];

const Countries = [
  `USA`,
  `Russia`,
  `New Zealand`,
];

const Directors = [
  `Director1`,
  `Director2`,
  `Director3`,
  `Director4`,
  `Director5`,
  `Director6`,
];

const Writers = [
  `Screenwriter1`,
  `Screenwriter2`,
  `Screenwriter3`,
  `Screenwriter4`,
  `Screenwriter5`,
  `Screenwriter6`,
];

const Actors = [
  `Actor1`,
  `Actor2`,
  `Actor3`,
  `Actor4`,
  `Actor5`,
  `Actor6`,
];

const RELEASE_DATE_MIN = new Date(`01.01.1900`);
const RELEASE_DATE_MAX = new Date(`01.01.2020`);


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

    originalName: getRandomArrayItem(FilmNames),
    director: getRandomArrayItem(Directors),
    writers: getRandomArrayItems(Writers, 3),
    actors: getRandomArrayItems(Actors, 4),
    releaseDate: getRandomDate(RELEASE_DATE_MIN, RELEASE_DATE_MAX),
    country: getRandomArrayItem(Countries),
    ageRating: getRandomArrayItem(AgeRatings),
  };
};

/**
 * Генерируем массив фильмов
 * @param {number} count - Число фильмов
 * @return {object} - Массив фильмов
 */
const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {
  generateFilms
};
