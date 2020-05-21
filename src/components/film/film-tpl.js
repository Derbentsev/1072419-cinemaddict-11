import {getTimeFromMins} from '@utils/common';


/**
 * Создаем разметку Карточка фильма
 * @param {object} film - Фильм
 * @return {string} Разметка карточки фильма
 */
export const createFilmCard = (film) => {
  const {
    name,
    commentsId,
    poster,
    rating,
    releaseDate,
    duration,
    genre,
    description,
    isWatchlist,
    isWatched,
    isFavorite,
  } = film;

  const durationAfterFormat = getTimeFromMins(duration);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${new Date(releaseDate).getFullYear()}</span>
        <span class="film-card__duration">${durationAfterFormat}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${commentsId.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWatchlist === true ? `film-card__controls-item--active` : ``}">
          Add to watchlist
        </button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched === true ? `film-card__controls-item--active` : ``}">
          Mark as watched
        </button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite === true ? `film-card__controls-item--active` : ``}">
          Mark as favorite
        </button>
      </form>
    </article>`
  );
};
