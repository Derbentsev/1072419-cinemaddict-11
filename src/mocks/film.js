import {
  getRandomArrayItem,
  getRandomIntegerNumber,
  castTimeFormat,
  getRandomFloatNumber,
  getRandomArrayItems,
  getRandomDate,
} from '../utils.js';

import {
  FilmSettings,
  FilmNames,
  Posters,
  Genre,
  Descriptions,
} from '../consts.js';


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


/**
 * Генерируем новый фильм
 * @return {object} - Случайно сгенерированный фильм
 */
const generateFilm = () => {
  return {
    name: getRandomArrayItem(FilmNames),
    poster: getRandomArrayItem(Posters),
    rating: getRandomFloatNumber(FilmSettings.MIN_RATING, FilmSettings.MAX_RATING),
    releaseYear: getRandomIntegerNumber(FilmSettings.MIN_RELEASE_YEAR, FilmSettings.MAX_RELEASE_YEAR),
    duration: castTimeFormat(getRandomIntegerNumber(FilmSettings.MIN_DURATION_MINUTES, FilmSettings.MAX_DURATION_MINUTES)),
    genre: getRandomArrayItem(Genre),
    description: getRandomArrayItem(Descriptions),
    commentsNumber: getRandomIntegerNumber(FilmSettings.MIN_COMMENTS, FilmSettings.MAX_COMMENTS),

    originalName: getRandomArrayItem(FilmNames),
    director: getRandomArrayItem(Directors),
    writers: getRandomArrayItems(Writers, 3),
    actors: getRandomArrayItems(Actors, 4),
    releaseDate: getRandomDate(FilmSettings.RELEASE_DATE_MIN, FilmSettings.RELEASE_DATE_MAX),
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
