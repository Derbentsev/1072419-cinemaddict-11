import {
  getRandomArrayItem,
  getRandomIntegerNumber,
  getRandomFloatNumber,
  getRandomArrayItems,
  getRandomDate,
} from '@utils/common';

import {
  FilmSettings,
  FilmNames,
  Posters,
  Genre,
  Descriptions,
} from '@consts';


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


const getRandomCommentsId = (comments) => {
  let commentsId = [];
  const commentsCount = getRandomIntegerNumber(1, 5);

  for (let i = 1; i <= commentsCount; i++) {
    commentsId.push(comments[getRandomIntegerNumber(0, comments.length)].id);
  }

  return commentsId;
};

const generateFilm = (comments) => {
  return function () {
    return {
      id: String(new Date() + Math.random()),

      commentsId: getRandomCommentsId(comments),

      name: getRandomArrayItem(FilmNames),
      poster: getRandomArrayItem(Posters),
      rating: getRandomFloatNumber(FilmSettings.MIN_RATING, FilmSettings.MAX_RATING),
      duration: getRandomIntegerNumber(FilmSettings.MIN_DURATION_MINUTES, FilmSettings.MAX_DURATION_MINUTES),
      genre: getRandomArrayItem(Genre),
      description: getRandomArrayItem(Descriptions),
      originalName: getRandomArrayItem(FilmNames),
      director: getRandomArrayItem(Directors),
      writers: getRandomArrayItems(Writers, 3),
      actors: getRandomArrayItems(Actors, 4),
      releaseDate: getRandomDate(FilmSettings.RELEASE_DATE_MIN, FilmSettings.RELEASE_DATE_MAX),
      country: getRandomArrayItem(Countries),
      ageRating: getRandomArrayItem(AgeRatings),

      isWatchlist: Math.random() > 0.5,
      isWatched: Math.random() > 0.5,
      isFavorite: Math.random() > 0.5,
      watchingDate: getRandomDate(FilmSettings.RELEASE_DATE_MIN, FilmSettings.RELEASE_DATE_MAX),
    };
  };
};


export const generateFilms = (count, comments) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm(comments));
};
