const FilmSettings = {
  COUNT: 22,
  TOP_COUNT: 2,
  MOST_COMMENTED_COUNT: 3,
  SHOW_FILMS_ON_START: 5,
  SHOW_FILMS_BUTTON_CLICK: 5,
  COMMENT_COUNT: 4,
  MIN_DURATION_MINUTES: 60,
  MAX_DURATION_MINUTES: 180,
  MIN_RATING: 0,
  MAX_RATING: 10,
  MIN_RELEASE_YEAR: 1917,
  MAX_RELEASE_YEAR: 2020,
  MIN_COMMENTS: 1,
  MAX_COMMENTS: 30,
  RELEASE_DATE_MIN: new Date(`01.01.1900`),
  RELEASE_DATE_MAX: new Date(`01.01.2020`),
  FOOTER_FILM_COUNT_MIN: 100,
  FOOTER_FILM_COUNT_MAX: 100000,
};

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

const Genre = [
  `horror`,
  `comedy`,
  `drama`,
];

const Descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.`,
  `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
];

const RenderPosition = {
  AFRERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};


export {
  FilmNames,
  Posters,
  Genre,
  Descriptions,
  FilmSettings,
  RenderPosition,
  SortType,
};
