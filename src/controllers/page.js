import FilmBoard from '@components/film-board/film-board';
import MovieController from './movie';
import ButtonShowMore from '@components/button-show-more/button-show-more';
import NoData from '@components/no-data/no-data';
import FilmList from '@components/film-list/film-list';
import FilmListExtra from '@components/film-list-extra/film-list-extra';
import Sort from '@components/sort/sort';
import CommentsModel from '@models/comments';
import {
  remove,
  render,
} from '@utils/render';
import {
  FilmSettings,
  RenderPosition,
  SortType,
} from '@consts';


export default class PageController {
  constructor(container, moviesModel, api) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._api = api;

    this._showedMoviesControllers = [];
    this._showingMoviesCount = FilmSettings.SHOW_FILMS_ON_START;

    this._commentsModel = new CommentsModel();
    this._noData = new NoData();
    this._filmBoard = new FilmBoard();
    this._filmList = new FilmList();
    this._filmListTop = new FilmListExtra(`Top rated`);
    this._filmListMostCommented = new FilmListExtra(`Most commented`);
    this._buttonShowMore = new ButtonShowMore();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onButtonShowMoreClick = this._onButtonShowMoreClick.bind(this);
    this._onChangeSortType = this._onChangeSortType.bind(this);
    this._onCommentDataChange = this._onCommentDataChange.bind(this);
  }

  render() {
    const films = this._moviesModel.getMovies();
    const container = this._container.getElement();

    this._sort = new Sort(this._onChangeSortType);
    render(container, this._sort, RenderPosition.BEFOREBEGIN);

    if (!films.length) {
      render(container, this._noData, RenderPosition.BEFOREEND);
      return;
    }

    const topFilms = this._getTopFilms(films);
    const mostCommentedFilms = this._getMostCommentedFilms(films);
    const newFilms = this._renderFilms(this._filmList.getElement(), films.slice(0, this._showingMoviesCount));

    this._showedMoviesControllers = this._showedMoviesControllers.concat(newFilms);
    this._showingMoviesCount = this._showedMoviesControllers.length;

    render(container, this._filmList, RenderPosition.BEFOREEND);

    if (topFilms) {
      this._renderFilms(this._filmListTop.getElement(), topFilms);
      render(container, this._filmListTop, RenderPosition.BEFOREEND);
    }

    if (mostCommentedFilms) {
      this._renderFilms(this._filmListMostCommented.getElement(), mostCommentedFilms);
      render(container, this._filmListMostCommented, RenderPosition.BEFOREEND);
    }

    render(this._filmList.getElement(), this._buttonShowMore, RenderPosition.BEFOREEND);

    this._moviesModel.setOnFilterChange(this._onFilterChange);
    this._buttonShowMore.setOnButtonClick(this._onButtonShowMoreClick);
  }

  hide() {
    this._container.hide();
    this._sort.hide();
  }

  show() {
    this._container.show();
    this._sort.show();
  }


  _getTopFilms(films) {
    const topFilms = films
      .sort((filmA, filmB) => {
        return filmB.rating - filmA.rating;
      })
      .slice(0, FilmSettings.TOP_COUNT);

    if (topFilms[0].rating === 0) {
      return null;
    }

    return topFilms;
  }

  _getMostCommentedFilms(films) {
    const mostCommentedFilms = films
      .sort((filmA, filmB) => {
        return filmB.commentsNumber - filmA.commentsNumber;
      })
      .slice(0, FilmSettings.MOST_COMMENTED_COUNT);

    if (mostCommentedFilms[0].rating === 0) {
      return null;
    }

    return mostCommentedFilms;
  }

  _onButtonShowMoreClick() {
    const films = this._moviesModel.getMovies();
    const prevFilmCount = this._showingMoviesCount;

    this._showingMoviesCount = this._showingMoviesCount + FilmSettings.SHOW_FILMS_BUTTON_CLICK;

    const sortedFilms = this._getSortedFilms(films, this._sort.getSortType(), prevFilmCount, this._showingMoviesCount);

    const newFilms = this._renderFilms(this._filmList.getElement(), sortedFilms);
    this._showedMoviesControllers = this._showedMoviesControllers.concat(newFilms);

    if (this._showingMoviesCount >= films.length) {
      remove(this._buttonShowMore);
    }
  }

  _onChangeSortType(sortType) {
    const films = this._moviesModel.getMovies();

    this._showingMoviesCount = FilmSettings.SHOW_FILMS_BUTTON_CLICK;

    const sortedFilms = this._getSortedFilms(films, sortType, 0, this._showingMoviesCount);

    this._filmList.getElement().querySelector(`.films-list__container`).innerHTML = ``;

    const newFilms = this._renderFilms(this._filmList.getElement(), sortedFilms);
    this._showedMoviesControllers = newFilms;
  }

  _renderFilms(container, films) {
    return films.map((film) => {
      const movieController = new MovieController(container, this._onDataChange, this._onViewChange, this._api, this._onCommentDataChange);
      movieController.render(film, this._commentsModel);
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

    const newFilms = this._renderFilms(this._filmList.getElement(), this._moviesModel.getMovies().slice(0, count));

    this._showedMoviesControllers = this._showedMoviesControllers.concat(newFilms);
    this._showingMoviesCount = this._showedMoviesControllers.length;

    render(this._filmList.getElement(), this._buttonShowMore, RenderPosition.BEFOREEND);
  }

  _onFilterChange() {
    this._updateFilms(FilmSettings.SHOW_FILMS_ON_START);
  }

  _onDataChange(movieController, oldData, newData) {
    this._api.updateMovie(oldData.id, newData)
      .then((movieModel) => {
        this._moviesModel.updateMovies(oldData.id, movieModel);
        movieController.render(newData, this._commentsModel);
      });
  }

  _onCommentDataChange(movieController, oldData, newData) {
    this._moviesModel.updateMovies(oldData.id, newData);
    movieController.render(newData, this._commentsModel);
  }

  _onViewChange() {
    this._showedMoviesControllers.forEach((it) => it.setDefaultView());
  }
}
