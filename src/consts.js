const FilmSettings = {
  TOP_COUNT: 2,
  MOST_COMMENTED_COUNT: 2,
  SHOW_FILMS_ON_START: 5,
  SHOW_FILMS_BUTTON_CLICK: 5,
};

const RenderPosition = {
  AFRERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  BEFOREBEGIN: `beforebegin`,
};

const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};

const FilterType = {
  ALL: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`,
};

const STATS_NAME = `Stats`;

const KeyCode = {
  ENTER: `Enter`,
};

const StatsMode = {
  ALL: `all`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`,
};

const Rating = {
  NO_RATING: {NAME: ``, COUNT: `0`},
  NOVICE: {NAME: `novice`, COUNT: `1`},
  FAN: {NAME: `fan`, COUNT: `11`},
  MOVIE_BUFF: {NAME: `movie buff`, COUNT: `21`},
};

const STORE_PREFIX = `cinemaddict-localstorage`;
const STORE_VERSION = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VERSION}`;

const MAX_COMMENT_SIZE = 139;

const AUTHORIZATION = `Basic h54jh5hj5j5jk45jkn`;


export {
  FilmSettings,
  RenderPosition,
  SortType,
  FilterType,
  KeyCode,
  STATS_NAME,
  AUTHORIZATION,
  StatsMode,
  STORE_NAME,
  Rating,
  MAX_COMMENT_SIZE,
};
