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
  render
} from '../utils/render';
import {
  FilmSettings,
  RenderPosition
} from '../consts';


/**
 * Отрисовавает карточки фильмов и навешивает обработчики событий на карточки и попапы
 * @param {object} siteFilmsBlock - Блок, в котором располагаются все отрисованные карточки фильмов
 * @param {object} siteFilmsContainer - Элемент, в котором отрисовываем карточку фильма
 * @param {object} film - Элемент массива с фильмами
 * @return {void}
 */
const renderFilm = (siteFilmsBlock, siteFilmsContainer, film, comments) => {
  const onFilmCLick = () => {
    siteFilmsBlock.appendChild(filmPopup.getElement());
    document.addEventListener(`keydown`, onClosePopupClick);
  };

  const onClosePopupClick = () => {
    siteFilmsBlock.removeChild(filmPopup.getElement());
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

/**
 * Отрисовывает основные элементы на главной странице - блоки ФИльров, Сортировки и т.д.
 * @param {object} films - Массив с фильмами, по которым отрисовываем карточки
 * @return {void}
 */
const renderFilmBoard = (films, topFilms, mostCommentedFilms) => {
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

  topFilms.forEach((film) => {
    renderFilm(siteFilmsBlock, siteTopRatedBlock, film);
  });

  mostCommentedFilms.forEach((film) => {
    renderFilm(siteFilmsBlock, siteMostCommentedBlock, film);
  });
};


const renderFilms = (films) => {
  films.slice(prevFilmCount, showingFilmsCount)
    .forEach((film) => {
      renderFilm(siteFilmsBlock, siteFilmsContainer, film);
    });
};

const getSlicedFilms = (films, from, to) => {
  return films.slice(from, to);
};


export class PageController {
  constructor(container) {
    this._container = container;

    this._noData = new NoData();
    this._filmBoard = new FilmBoard();
    this._filmList = new FilmList();
    this._filmListTop = new FilmListExtra(`Top rated`);
    this._filmListMostCommented = new FilmListExtra(`Most commented`);
    this._buttonShowMore = new ButtonShowMore();
  }

  render(films, topFilms, mostCommentedFilms, comments) {
    let showingFilmsCount = FilmSettings.SHOW_FILMS_ON_START;
    let slicedFilms = getSlicedFilms(films, 0, FilmSettings.SHOW_FILMS_ON_START);

    slicedFilms.forEach((film) => {
      renderFilm(null, this._filmList.getElement(), film, comments);
    });

    const onButtonShowMoreClick = () => {
      const prevFilmCount = showingFilmsCount;
      showingFilmsCount = showingFilmsCount + FilmSettings.SHOW_FILMS_BUTTON_CLICK;

      renderFilms();
    };

    const container = this._container.getElement();

    if (!films.length) {
      render(container, this._noData, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._filmList, RenderPosition.BEFOREEND);
    render(container, this._filmListTop, RenderPosition.BEFOREEND);
    render(container, this._filmListMostCommented, RenderPosition.BEFOREEND);

    render(this._filmList.getElement(), this._buttonShowMore, RenderPosition.BEFOREEND);

    this._buttonShowMore.setOnButtonClick(onButtonShowMoreClick);
  }
}
