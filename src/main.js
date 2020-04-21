import {
  UserProfile
} from './components/user-profile/user-profile.js';
import {
  FilmBoard
} from './components/film-board/film-board.js';
import {
  ButtonShowMore
} from './components/button-show-more/button-show-more.js';
import {
  Film
} from './components/film/film.js';
import {
  FilmPopup
} from './components/film-popup/film-popup.js';
import {
  Filter
} from './components/filter/filter.js';
import {
  Sort
} from './components/sort/sort.js';
import {
  Statistic
} from './components/statistic/statistic.js';
import {
  Comment
} from './components/comment/comment.js';
import {
  generateFilms
} from './mocks/film.js';
import {
  generateFilters
} from './mocks/filter.js';
import {
  generateSorts
} from './mocks/sort.js';
import {
  generateComments
} from './mocks/comment.js';
import {
  render
} from './utils.js';
import {
  FilmSettings,
  RenderPosition
} from './consts.js';
import {
  NoData
} from './components/no-data/no-data.js';


/**
 * Отрисовавает карточки фильмов и навешивает обработчики событий на карточки и попапы
 * @param {object} siteFilmsBlock - Блок, в котором располагаются все отрисованные карточки фильмов
 * @param {object} siteFilmsContainer - Элемент, в котором отрисовываем карточку фильма
 * @param {object} film - Элемент массива с фильмами
 * @return {void}
 */
const renderFilm = (siteFilmsBlock, siteFilmsContainer, film) => {
  const onFilmCLick = () => {
    siteFilmsBlock.appendChild(filmPopup.getElement());
    document.addEventListener(`keydown`, onClosePopupClick);
  };

  const onClosePopupClick = () => {
    siteFilmsBlock.removeChild(filmPopup.getElement());
    document.removeEventListener(`keydown`, onClosePopupClick);
  };

  const filmComponent = new Film(film);
  const filmPoster = filmComponent.getElement().querySelector(`.film-card__poster`);
  const filmTitle = filmComponent.getElement().querySelector(`.film-card__title`);
  const filmComments = filmComponent.getElement().querySelector(`.film-card__comments`);

  render(siteFilmsContainer, filmComponent.getElement(), RenderPosition.BEFOREEND);

  filmPoster.addEventListener(`click`, onFilmCLick);
  filmTitle.addEventListener(`click`, onFilmCLick);
  filmComments.addEventListener(`click`, onFilmCLick);

  const filmPopup = new FilmPopup(film);
  const comments = generateComments(FilmSettings.COMMENT_COUNT);

  const commentBlock = filmPopup.getElement().querySelector(`.film-details__comments-list`);
  comments.forEach((comment) => {
    render(commentBlock, new Comment(comment).getElement(), RenderPosition.BEFOREEND);
  });

  const popupButtonClose = filmPopup.getElement().querySelector(`.film-details__close-btn`);
  popupButtonClose.addEventListener(`click`, onClosePopupClick);
};

/**
 * Отрисовываем блоки Фильтра, Сортировки и Аватарки пользователя
 */
const renderSortsFilters = () => {
  render(siteHeaderElement, new UserProfile().getElement(), RenderPosition.BEFOREEND);
  render(siteMainElement, new Filter(filters).getElement(), RenderPosition.BEFOREEND);
  render(siteMainElement, new Sort(sorts).getElement(), RenderPosition.BEFOREEND);
};

/**
 * Отрисовываем блок статистики
 */
const renderStatistic = () => {
  render(siteFooterElement, new Statistic(films.length).getElement(), RenderPosition.BEFOREEND);
};

/**
 * Отрисовывает основные элементы на главной странице - блоки ФИльров, Сортировки и т.д.
 * @param {object} films - Массив с фильмами, по которым отрисовываем карточки
 * @return {void}
 */
const renderFilmBoard = (films) => {
  render(siteMainElement, new FilmBoard().getElement(), RenderPosition.BEFOREEND);

  const siteFilmsBlock = siteMainElement.querySelector(`.films`);
  const siteFilmsList = siteFilmsBlock.querySelector(`.films-list`);
  const siteFilmsContainer = siteFilmsBlock.querySelector(`.films-list__container`);
  const siteTopRatedBlock = siteFilmsBlock.querySelectorAll(`.films-list--extra .films-list__container`)[0];
  const siteMostCommentedBlock = siteFilmsBlock.querySelectorAll(`.films-list--extra .films-list__container`)[1];

  let showingFilmsCount = FilmSettings.SHOW_FILMS_ON_START;
  films.slice(0, showingFilmsCount)
    .forEach((film) => {
      renderFilm(siteFilmsBlock, siteFilmsContainer, film);
    });

  render(siteFilmsList, new ButtonShowMore().getElement(), RenderPosition.BEFOREEND);

  const buttonLoadMore = siteFilmsBlock.querySelector(`.films-list__show-more`);

  buttonLoadMore.addEventListener(`click`, () => {
    const prevFilmCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + FilmSettings.SHOW_FILMS_BUTTON_CLICK;

    films.slice(prevFilmCount, showingFilmsCount)
      .forEach((film) => {
        renderFilm(siteFilmsBlock, siteFilmsContainer, film);
      });
  });

  const topFilms = generateFilms(FilmSettings.TOP_COUNT);
  topFilms.forEach((film) => {
    renderFilm(siteFilmsBlock, siteTopRatedBlock, film);
  });

  const mostCommentedFilms = generateFilms(FilmSettings.MOST_COMMENTED_COUNT);
  mostCommentedFilms.forEach((film) => {
    renderFilm(siteFilmsBlock, siteMostCommentedBlock, film);
  });
};


const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`footer`);

const films = generateFilms(FilmSettings.COUNT);
const filters = generateFilters(films);
const sorts = generateSorts(films);

if (films.length > 0) {
  renderSortsFilters();
  renderFilmBoard(films);
  renderStatistic();
} else {
  renderSortsFilters();
  render(siteMainElement, new NoData().getElement(), RenderPosition.BEFOREEND);
  renderStatistic();
}
