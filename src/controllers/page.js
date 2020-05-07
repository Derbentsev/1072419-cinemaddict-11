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
  }

  render(topFilms, mostCommentedFilms, comments) {
    const films = this._movieModel.getMovies();
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

      this._renderFilms(this._filmList.getElement(), sortedFilms);

      if (showingFilmsCount > films.length) {
        remove(this._buttonShowMore);
      }
    };

    const setOnChangeSortType = (sortType) => {
      showingFilmsCount = FilmSettings.SHOW_FILMS_BUTTON_CLICK;
      const sortedFilms = this._getSortedFilms(films, sortType, 0, showingFilmsCount);

      this._filmList.getElement().querySelector(`.films-list__container`).innerHTML = ``;

      const newFilms = this._renderFilms(this._filmList.getElement(), sortedFilms);
      this._showedMoviesControllers = newFilms;

      this._sort.getElement().querySelector(`.sort__button--active`).classList.remove(`sort__button--active`);
      const index = this._sorts.findIndex((it) => it.name === `Sort by ` + sortType);
      this._sort.getElement().children[index].querySelector(`.sort__button`).classList.add(`sort__button--active`);
    };


    render(container, this._sort, RenderPosition.BEFOREEND);
    const newFilms = this._renderFilms(this._filmList.getElement(), films.slice(0, showingFilmsCount));
    this._showedMoviesControllers = this._showedMoviesControllers.concat(newFilms);

    this._renderFilms(this._filmListTop.getElement(), topFilms);
    this._renderFilms(this._filmListMostCommented.getElement(), mostCommentedFilms);

    render(container, this._filmList, RenderPosition.BEFOREEND);
    render(container, this._filmListTop, RenderPosition.BEFOREEND);
    render(container, this._filmListMostCommented, RenderPosition.BEFOREEND);

    render(this._filmList.getElement(), this._buttonShowMore, RenderPosition.BEFOREEND);

    this._buttonShowMore.setOnButtonClick(onButtonShowMoreClick);

    this._sort.setOnChangeSortType(setOnChangeSortType);
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
    this._renderFilms(this._filmList.getElement(), this._movieModel.getMovies().slice(0, count));
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
