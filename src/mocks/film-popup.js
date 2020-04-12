import {
  getRandomArrayItem,
  castTimeFormat,
  getRandomArrayItems,
  getRandomIntegerNumber,
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
  Descriptions,
  MonthNamesShort
} from '../consts.js';


const RELEASE_DATE_MIN = new Date(`01.01.1900`);
const RELEASE_DATE_MAX = new Date(`01.01.2020`);

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
 * Генерируем случайную дату внутри заданного промежутка
 * @param {date} dateStart - Минимально возможная дата
 * @param {date} dateEnd - Максимально возможная дата
 * @return {string} - Случайная дата
 */
const getRandomDate = (dateStart, dateEnd) => {
  const randomDate = new Date(dateStart.getTime() + Math.random() * (dateEnd.getTime() - dateStart.getTime()));
  return randomDate.getDate() + ` ` + MonthNamesShort[randomDate.getMonth()] + ` ` + randomDate.getFullYear();
};

/**
 * Генерируем новый попап
 * @return {object} - Случайно сгенерированный попап
 */
const generateFilmPopup = () => {
  return {
    poster: getRandomArrayItem(Posters),
    name: getRandomArrayItem(FilmNames),
    originalName: getRandomArrayItem(FilmNames),
    rating: getRandomFloatNumber(MIN_RATING, MAX_RATING),
    director: getRandomArrayItem(Directors),
    writers: getRandomArrayItems(Writers, 3),
    actors: getRandomArrayItems(Actors, 4),
    releaseDate: getRandomDate(RELEASE_DATE_MIN, RELEASE_DATE_MAX),
    duration: castTimeFormat(getRandomIntegerNumber(MIN_DURATION_MINUTES, MAX_DURATION_MINUTES)),
    country: getRandomArrayItem(Countries),
    genre: getRandomArrayItem(Genre),
    description: getRandomArrayItem(Descriptions),
    ageRating: getRandomArrayItem(AgeRatings)
  };
};


export {generateFilmPopup};
