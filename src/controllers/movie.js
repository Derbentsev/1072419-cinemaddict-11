import {
  Film
} from "../components/film/film";
import {
  FilmPopup
} from '../components/film-popup/film-popup';
import {
  Comment
} from '../components/comment/comment';
import {
  render,
  replace,
} from '../utils/render';
import {
  RenderPosition
} from '../consts';


export class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._filmComponent = null;
    this._filmPopupComponent = null;
  }

  render(film, comments) {
    const oldFilmComponent = this._filmComponent;
    const oldFilmPopupComponent = this._filmPopupComponent;

    this._filmComponent = new Film(film);
    this._filmPopupComponent = new FilmPopup(film);

    const onFilmClick = () => {
      this._container.parentElement.appendChild(this._filmPopupComponent.getElement());
      document.addEventListener(`keydown`, onClosePopupClick);
    };

    const onClosePopupClick = () => {
      this._container.parentElement.removeChild(this._filmPopupComponent.getElement());
      document.removeEventListener(`keydown`, onClosePopupClick);
    };

    const onClickAddToWatchlist = () => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatchlist: !film.isWatchlist
      }));
    };

    const onClickAlreadyWatched = () => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched
      }));
    };

    const onClickAddToFavorites = () => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite
      }));
    };


    const filmListContainer = this._container.querySelector(`.films-list__container`);
    this._filmComponent.setOnFilmClick(onFilmClick);
    this._filmComponent.setOnClickAddToWatchlist(onClickAddToWatchlist);
    this._filmComponent.setOnClickAddToAlreadyWatched(onClickAlreadyWatched);
    this._filmComponent.setOnClickAddToFavorites(onClickAddToFavorites);

    const commentBlock = this._filmPopupComponent.getElement().querySelector(`.film-details__comments-list`);
    this._filmPopupComponent.setOnClickCloseButton(onClosePopupClick);
    this._filmPopupComponent.setOnClickAddToWatchlist(onClickAddToWatchlist);
    this._filmPopupComponent.setOnClickAddToAlreadyWatched(onClickAlreadyWatched);
    this._filmPopupComponent.setOnClickAddToFavorites(onClickAddToFavorites);

    comments.forEach((comment) => {
      render(commentBlock, new Comment(comment), RenderPosition.BEFOREEND);
    });

    if (oldFilmComponent && oldFilmPopupComponent) {
      replace(this._filmComponent, oldFilmComponent);
    } else {
      render(filmListContainer, this._filmComponent, RenderPosition.BEFOREEND);
    }
  }
}
