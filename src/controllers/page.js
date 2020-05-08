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
  render,
} from 'Utils/render';
import {
  FilmSettings,
  RenderPosition,
  SortType,
} from '../consts';
import {
  Sort
} from '../components/sort/sort';
import {
  generateSorts
} from '../mocks/sort';


export class PageController {
  constructor(container, movieModel) {
    this._container = container;
    this._movieModel = movieModel;

    this._comments = [];
    this._showedMoviesControllers = [];
    this._showingMoviesCount = FilmSettings.SHOW_FILMS_ON_START;

    this._noData = new NoData();
    this._filmBoard = new FilmBoard();
    this._filmList = new FilmList();
    this._filmListTop = new FilmListExtra(`Top rated`);
    this._filmListMostCommented = new FilmListExtra(`Most commented`);
    this._buttonShowMore = new ButtonShowMore();

    this._sorts = generateSorts();
    this._sort = new Sort(this._sorts);

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._renderFilms = this._renderFilms;
    this._getSortedFilms = this._getSortedFilms;

    this._movieModel.setOnFilterChange(this._onFilterChange);

    this._onButtonShowMoreClick = this._onButtonShowMoreClick.bind(this);
    this._setOnChangeSortType = this._setOnChangeSortType.bind(this);
  }

  render(topFilms, mostCommentedFilms, comments) {
    this._comments = comments;
    const films = this._movieModel.getMovies();
    const container = this._container.getElement();

    if (!films.length) {
      render(container, this._noData, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sort, RenderPosition.BEFOREEND);

    const newFilms = this._renderFilms(this._filmList.getElement(), films.slice(0, this._showingMoviesCount));

    this._showedMoviesControllers = this._showedMoviesControllers.concat(newFilms);
    this._showingMoviesCount = this._showedMoviesControllers.length;

    this._renderFilms(this._filmListTop.getElement(), topFilms);
    this._renderFilms(this._filmListMostCommented.getElement(), mostCommentedFilms);
    render(container, this._filmList, RenderPosition.BEFOREEND);

    render(container, this._filmListTop, RenderPosition.BEFOREEND);
    render(container, this._filmListMostCommented, RenderPosition.BEFOREEND);

    render(this._filmList.getElement(), this._buttonShowMore, RenderPosition.BEFOREEND);

    this._buttonShowMore.setOnButtonClick(this._onButtonShowMoreClick);

    this._sort.setOnChangeSortType(this._setOnChangeSortType);
  }

  _onButtonShowMoreClick() {
    const films = this._movieModel.getMovies();
    const prevFilmCount = this._showingMoviesCount;

    this._showingMoviesCount = this._showingMoviesCount + FilmSettings.SHOW_FILMS_BUTTON_CLICK;

    const sortedFilms = this._getSortedFilms(films, this._sort.getSortType(), prevFilmCount, this._showingMoviesCount);

    const newFilms = this._renderFilms(this._filmList.getElement(), sortedFilms);
    this._showedMoviesControllers = this._showedMoviesControllers.concat(newFilms);

    if (this._showingMoviesCount > films.length) {
      remove(this._buttonShowMore);
    }
  }

  _setOnChangeSortType(sortType) {
    const films = this._movieModel.getMovies();

    this._showingMoviesCount = FilmSettings.SHOW_FILMS_BUTTON_CLICK;
    const sortedFilms = this._getSortedFilms(films, sortType, 0, this._showingMoviesCount);

    this._filmList.getElement().querySelector(`.films-list__container`).innerHTML = ``;

    const newFilms = this._renderFilms(this._filmList.getElement(), sortedFilms);
    this._showedMoviesControllers = newFilms;
  }

  _renderFilms(container, films) {
    return films.map((film) => {
      const movieController = new MovieController(container, this._onDataChange, this._onViewChange);
      movieController.render(film, this._comments);
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

  _removeFilms() {
    this._showedMoviesControllers.forEach((filmController) => filmController.destroy());
    this._showedMoviesControllers = [];
  }

  _updateFilms(count) {
    this._removeFilms();
    const newFilms = this._renderFilms(this._filmList.getElement(), this._movieModel.getMovies().slice(0, count));

    this._showedMoviesControllers = this._showedMoviesControllers.concat(newFilms);
    this._showingMoviesCount = this._showedMoviesControllers.length;

    render(this._filmList.getElement(), this._buttonShowMore, RenderPosition.BEFOREEND);
  }

  _onFilterChange() {
    this._updateFilms(FilmSettings.SHOW_FILMS_ON_START);
  }

  _onDataChange(movieController, oldData, newData) {
    this._movieModel.updateMovies(oldData.id, newData);
    movieController.render(newData, this._comments);
  }

  _onViewChange() {
    this._showedMoviesControllers.forEach((it) => it.setDefaultView());
  }
}
