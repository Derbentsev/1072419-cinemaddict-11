import {
  Film
} from "../components/film/film";
import {
  FilmPopup
} from '../components/film-popup/film-popup';
import {
  render,
  replace,
  remove,
} from 'Utils/render';
import {
  RenderPosition
} from 'Consts/consts';
import {
  CommentController
} from '../controllers/comment';
import {
  CommentModel
} from '../models/comments';
import {
  generateComments
} from '../mocks/comment';
import {
  FilmSettings,
} from 'Consts/consts';


const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};


export class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;

    this._commentModel = null;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._showedCommentsControllers = [];

    this._filmComponent = null;
    this._filmPopupComponent = null;
    this._commentsComponent = null;

    this._onEscPress = this._onEscPress.bind(this);
    this._onCommentsChange = this._onCommentsDataChange.bind(this);
  }

  render(film) {
    const oldFilmComponent = this._filmComponent;
    const oldFilmPopupComponent = this._filmPopupComponent;

    this._filmComponent = new Film(film);
    this._filmPopupComponent = new FilmPopup(film);

    const onFilmClick = () => {
      this._replaceFilmToPopup();
      document.addEventListener(`keydown`, this._onEscPress);
    };

    const onClosePopupClick = () => {
      this._replacePopupToFilm();
      document.removeEventListener(`keydown`, onClosePopupClick);
      document.removeEventListener(`keydown`, this._onEscPress);
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

    const onFormSubmit = (evt) => {
      evt.preventDefault();
      const data = this._filmPopupComponent.getData();
      this._onDataChange(this, film, data);
    };


    const comments = generateComments(FilmSettings.COMMENT_COUNT);
    const commentsContainer = this._filmPopupComponent.getElement().querySelector(`.film-details__comments-list`);

    this._commentModel = new CommentModel();
    this._commentModel.setComments(comments);
    this._commentModel.setOnDataChange(this._onDataChange);

    comments.forEach((comment) => {
      const commentController = new CommentController(commentsContainer, this._commentModel, this._onCommentsDataChange);
      commentController.render(comment);
      this._showedCommentsControllers = this._showedCommentsControllers.concat(commentController);
    });


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
    this._filmPopupComponent.setOnFormSubmit(onFormSubmit);

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

  destroy() {
    remove(this._filmComponent);
    remove(this._filmPopupComponent);
    document.removeEventListener(`keydown`, this._onEscPress);
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

  _onEscPress(evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      this._replacePopupToFilm();
      document.removeEventListener(`keydown`, this._onEscPress);
    }
  }

  _onCommentsDataChange(commentComponent, oldData, newData) {
    if (newData === null) {
      this._commentModel.removeComment(oldData.id);
      commentComponent.destroy();
    }
  }
}
