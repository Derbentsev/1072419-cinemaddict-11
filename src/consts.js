const FilmSettings = {
  COUNT: 22,
  TOP_COUNT: 2,
  MOST_COMMENTED_COUNT: 2,
  SHOW_FILMS_ON_START: 5,
  SHOW_FILMS_BUTTON_CLICK: 5,
  COMMENT_COUNT: 30,
  MIN_DURATION_MINUTES: 60,
  MAX_DURATION_MINUTES: 180,
  MIN_RATING: 0,
  MAX_RATING: 10,
  MIN_COMMENTS: 1,
  MAX_COMMENTS: 30,
  RELEASE_DATE_MIN: new Date(`01.01.1900`),
  RELEASE_DATE_MAX: new Date(`01.01.2020`),
  WATCHING_DATE_MIN: new Date(2020, 1, 1),
  WATCHING_DATE_MAX: new Date(2020, 1, 1),
};

const AUTHORIZATION = `Basic h54jh5hj5j5jk45jkn`;

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

const STORE_PREFIX = `cinemaddict-localstorage`;
const STORE_VERSION = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VERSION}`;


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
};
