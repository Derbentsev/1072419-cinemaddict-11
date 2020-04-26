import {
  FilmBoard
} from '../components/film-board/film-board';
import {
  ButtonShowMore
} from '../components/button-show-more/button-show-more';
import {
  Film
} from '../components/film/film';
import {
  FilmPopup
} from '../components/film-popup/film-popup';
import {
  Comment
} from '../components/comment/comment';
import {
  NoData
} from '../components/no-data/no-data';
import {
  FilmList
} from '../components/film-list/film-list';
import {
  FilmListExtra
} from '../components/film-list-extra/film-list-extra';
import {
  remove,
  render
} from '../utils/render';
import {
  FilmSettings,
  RenderPosition,
  SortType,
} from '../consts';
import {
  Sort
} from '../components/sort/sort';


/**
 * Отрисовавает карточки фильмов и навешивает обработчики событий на карточки и попапы
 * @param {object} siteFilmsContainer - Элемент, в котором отрисовываем карточку фильма
 * @param {object} film - Элемент массива с фильмами
 * @param {object} comments - Массив с комментариями
 * @return {void}
 */
const renderFilm = (siteFilmsContainer, film, comments) => {
  const onFilmCLick = () => {
    siteFilmsContainer.parentElement.appendChild(filmPopup.getElement());
    document.addEventListener(`keydown`, onClosePopupClick);
  };

  const onClosePopupClick = () => {
    siteFilmsContainer.parentElement.removeChild(filmPopup.getElement());
    document.removeEventListener(`keydown`, onClosePopupClick);
  };

  const filmComponent = new Film(film);
  const filmListContainer = siteFilmsContainer.querySelector(`.films-list__container`);
  filmComponent.setOnFilmClick(onFilmCLick);

  render(filmListContainer, filmComponent, RenderPosition.BEFOREEND);

  const filmPopup = new FilmPopup(film);
  const commentBlock = filmPopup.getElement().querySelector(`.film-details__comments-list`);

  comments.forEach((comment) => {
    render(commentBlock, new Comment(comment), RenderPosition.BEFOREEND);
  });

  filmPopup.setOnClickCLoseButton(onClosePopupClick);
};


const renderFilms = (container, films, comments) => {
  return films.forEach((film) => {
    renderFilm(container, film, comments);
  });
};

const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.DATE:
      sortedFilms = showingFilms.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
      break;
    case SortType.RATING:
      sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
      break;
    case SortType.DEFAULT:
      sortedFilms = films;
      break;
  }

  return sortedFilms.slice(from, to);
};


export class PageController {
  constructor(container, sorts) {
    this._container = container;

    this._noData = new NoData();
    this._filmBoard = new FilmBoard();
    this._filmList = new FilmList();
    this._filmListTop = new FilmListExtra(`Top rated`);
    this._filmListMostCommented = new FilmListExtra(`Most commented`);
    this._buttonShowMore = new ButtonShowMore();
    this._sort = new Sort(sorts);
  }

  render(films, topFilms, mostCommentedFilms, comments) {
    if (!films.length) {
      render(container, this._noData, RenderPosition.BEFOREEND);
      return;
    }

    let showingFilmsCount = FilmSettings.SHOW_FILMS_ON_START;
    const container = this._container.getElement();

    const onButtonShowMoreClick = () => {
      const prevFilmCount = showingFilmsCount;
      showingFilmsCount = showingFilmsCount + FilmSettings.SHOW_FILMS_BUTTON_CLICK;

      const sortedFilms = getSortedFilms(films, this._sort.getSortType(), prevFilmCount, showingFilmsCount);

      renderFilms(this._filmList.getElement(), sortedFilms, comments);

      if (showingFilmsCount > films.length) {
        remove(this._buttonShowMore);
      }
    };

    const setOnChangeSortType = (sortType) => {
      showingFilmsCount = FilmSettings.SHOW_FILMS_BUTTON_CLICK;
      const sortedFilms = getSortedFilms(films, sortType, 0, showingFilmsCount);

      this._filmList.getElement().querySelector(`.films-list__container`).innerHTML = ``;

      renderFilms(this._filmList.getElement(), sortedFilms, comments);
    };


    render(container, this._sort, RenderPosition.BEFOREEND);

    renderFilms(this._filmList.getElement(), films.slice(0, showingFilmsCount), comments);
    renderFilms(this._filmListTop.getElement(), topFilms, comments);
    renderFilms(this._filmListMostCommented.getElement(), mostCommentedFilms, comments);

    render(container, this._filmList, RenderPosition.BEFOREEND);
    render(container, this._filmListTop, RenderPosition.BEFOREEND);
    render(container, this._filmListMostCommented, RenderPosition.BEFOREEND);

    render(this._filmList.getElement(), this._buttonShowMore, RenderPosition.BEFOREEND);

    this._buttonShowMore.setOnButtonClick(onButtonShowMoreClick);

    this._sort.setOnChangeSortType(setOnChangeSortType);
  }
}
