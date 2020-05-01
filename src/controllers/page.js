import {
  FilmBoard
} from '../components/film-board/film-board';
import {
  MovieController
} from './movie';
import {
  ButtonShowMore
} from '../components/button-show-more/button-show-more';
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


export class PageController {
  constructor(container, sorts) {
    this._container = container;

    this._films = [];
    this._comments = [];
    this._showedFilmsControllers = [];

    this._noData = new NoData();
    this._filmBoard = new FilmBoard();
    this._filmList = new FilmList();
    this._filmListTop = new FilmListExtra(`Top rated`);
    this._filmListMostCommented = new FilmListExtra(`Most commented`);
    this._buttonShowMore = new ButtonShowMore();
    this._sort = new Sort(sorts);

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._renderFilms = this._renderFilms;
    this._getSortedFilms = this._getSortedFilms;
  }

  render(films, topFilms, mostCommentedFilms, comments) {
    this._films = films;
    this._comments = comments;

    if (!films.length) {
      render(container, this._noData, RenderPosition.BEFOREEND);
      return;
    }

    let showingFilmsCount = FilmSettings.SHOW_FILMS_ON_START;
    const container = this._container.getElement();

    const onButtonShowMoreClick = () => {
      const prevFilmCount = showingFilmsCount;
      showingFilmsCount = showingFilmsCount + FilmSettings.SHOW_FILMS_BUTTON_CLICK;

      const sortedFilms = this._getSortedFilms(films, this._sort.getSortType(), prevFilmCount, showingFilmsCount);

      this._renderFilms(this._filmList.getElement(), sortedFilms, comments, this._onDataChange, this._onViewChange);

      if (showingFilmsCount > films.length) {
        remove(this._buttonShowMore);
      }
    };

    const setOnChangeSortType = (sortType) => {
      showingFilmsCount = FilmSettings.SHOW_FILMS_BUTTON_CLICK;
      const sortedFilms = this._getSortedFilms(films, sortType, 0, showingFilmsCount);

      this._filmList.getElement().querySelector(`.films-list__container`).innerHTML = ``;

      const newFilms = this._renderFilms(this._filmList.getElement(), sortedFilms, comments, this._onDataChange, this._onViewChange);
      this._showedFilmsControllers = newFilms;
    };


    render(container, this._sort, RenderPosition.BEFOREEND);

    const newFilms = this._renderFilms(this._filmList.getElement(), films.slice(0, showingFilmsCount), comments, this._onDataChange, this._onViewChange);
    this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);

    this._renderFilms(this._filmListTop.getElement(), topFilms, comments, this._onDataChange, this._onViewChange);
    this._renderFilms(this._filmListMostCommented.getElement(), mostCommentedFilms, comments, this._onDataChange, this._onViewChange);

    render(container, this._filmList, RenderPosition.BEFOREEND);
    render(container, this._filmListTop, RenderPosition.BEFOREEND);
    render(container, this._filmListMostCommented, RenderPosition.BEFOREEND);

    render(this._filmList.getElement(), this._buttonShowMore, RenderPosition.BEFOREEND);

    this._buttonShowMore.setOnButtonClick(onButtonShowMoreClick);

    this._sort.setOnChangeSortType(setOnChangeSortType);
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));
    movieController.render(this._films[index], this._comments);
  }

  _onViewChange() {
    this._showedFilmsControllers.forEach((it) => it.setDefaultView());
  }

  _renderFilms(container, films, comments, onDataChange, onViewChange) {
    return films.map((film) => {
      const movieController = new MovieController(container, onDataChange, onViewChange);

      movieController.render(film, comments);

      return movieController;
    });
  }

  _getSortedFilms(films, sortType, from, to) {
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
  }
}
