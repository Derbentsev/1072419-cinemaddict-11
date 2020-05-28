import moment from 'moment';
import {Rating} from '@consts';


/**
 * Создаем пустой элемент div и в него вкладываем вёрстку
 * @param {string} template - Вёрстка
 * @return {string} DOM-элемент
 */
const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const getHoursFromMins = (mins) => {
  return Math.floor(mins / 60);
};

const getMinutesFromMins = (mins) => {
  const duration = moment.duration(mins, `minutes`);
  return moment.utc(duration.as(`milliseconds`)).format(`mm`);
};

/**
 * Преобразует минуты в формат `12h 36m`
 * @param {number} mins - Количество минут
 * @return {string} Строка в формате `12h 36m`
 */
const getTimeFromMins = (mins) => {
  const duration = moment.duration(mins, `minutes`);
  return moment.utc(duration.as(`milliseconds`)).format(`H[h] mm[m]`);
};

const getUserRating = (watchedMovies) => {
  let profileName = Rating.NO_RATING.NAME;

  if (watchedMovies >= Rating.MOVIE_BUFF.COUNT) {
    profileName = Rating.MOVIE_BUFF.NAME;
  } else if (watchedMovies >= Rating.FAN.COUNT) {
    profileName = Rating.FAN.NAME;
  } else if (watchedMovies >= Rating.NOVICE.COUNT) {
    profileName = Rating.NOVICE.NAME;
  }

  return profileName;
};


export {
  getTimeFromMins,
  createElement,
  getHoursFromMins,
  getMinutesFromMins,
  getUserRating,
};
