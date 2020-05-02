import {
  Film
} from "../components/film/film";
import {
  FilmPopup
} from '../components/film-popup/film-popup';
import {
  render,
  replace,
} from 'Utils/render';
import {
  RenderPosition
} from 'Consts/consts';


const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};


export class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._filmComponent = null;
    this._filmPopupComponent = null;
  }

  render(film, comments) {
    const oldFilmComponent = this._filmComponent;
    const oldFilmPopupComponent = this._filmPopupComponent;

    this._filmComponent = new Film(film);
    this._filmPopupComponent = new FilmPopup(film, comments);

    const onFilmClick = () => {
      this._replaceFilmToPopup();
      document.addEventListener(`keydown`, onPopupEscPress);
    };

    const onPopupEscPress = (evt) => {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        onClosePopupClick();
      }
    };

    const onClosePopupClick = () => {
      this._replacePopupToFilm();
      document.removeEventListener(`keydown`, onClosePopupClick);
      document.removeEventListener(`keydown`, onPopupEscPress);
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

    this._filmComponent.setClickOnFilm(onFilmClick);
    this._filmComponent.setClickOnAddToWatchlist(onClickAddToWatchlist);
    this._filmComponent.setClickOnAddToAlreadyWatched(onClickAlreadyWatched);
    this._filmComponent.setClickOnAddToFavorites(onClickAddToFavorites);

    this._filmPopupComponent.setClickOnCloseButton(onClosePopupClick);
    this._filmPopupComponent.setClickOnAddToWatchlist(onClickAddToWatchlist);
    this._filmPopupComponent.setClickOnAddToAlreadyWatched(onClickAlreadyWatched);
    this._filmPopupComponent.setClickOnAddToFavorites(onClickAddToFavorites);
    this._filmPopupComponent.setClickOnOnEmojiList();

    if (oldFilmComponent && oldFilmPopupComponent) {
      replace(this._filmComponent, oldFilmComponent);
      replace(this._filmPopupComponent, oldFilmPopupComponent);
      return;
    }

    render(filmListContainer, this._filmComponent, RenderPosition.BEFOREEND);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replacePopupToFilm();
    }
  }

  _replacePopupToFilm() {
    this._container.parentElement.removeChild(this._filmPopupComponent.getElement());
    this._mode = Mode.DEFAULT;
  }

  _replaceFilmToPopup() {
    this._onViewChange();
    this._container.parentElement.appendChild(this._filmPopupComponent.getElement());
    this._mode = Mode.EDIT;
  }
}
