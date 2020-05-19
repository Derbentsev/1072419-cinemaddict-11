import {Film} from "@components/film/film";
import {FilmPopup} from '@components/film-popup/film-popup';
import {Comment} from '@components/comment/comment';
import {API} from '@src/api';
import {
  render,
  replace,
  remove,
} from '@utils/render';
import {
  RenderPosition,
  KeyCode,
  AUTHORIZATION,
} from '@consts';


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

    this._showedCommentsControllers = [];

    this._filmComponent = null;
    this._filmPopupComponent = null;
    this._commentContainer = null;
    this._commentModel = null;

    this._renderComments = this._renderComments.bind(this);
    this._onFilmClick = this._onFilmClick.bind(this);
    this._onClosePopupClick = this._onClosePopupClick.bind(this);
    this._onEscPress = this._onEscPress.bind(this);
    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onCommentsDataChange = this._onCommentsDataChange.bind(this);
  }

  render(film, commentModel) {
    const api = new API(AUTHORIZATION);

    const oldFilmComponent = this._filmComponent;
    const oldFilmPopupComponent = this._filmPopupComponent;
    const filmListContainer = this._container.querySelector(`.films-list__container`);

    this._commentModel = commentModel;

    this._filmComponent = new Film(film);
    this._filmPopupComponent = new FilmPopup(film, this._onCommentsDataChange);
    this._commentContainer = this._filmPopupComponent.getElement().querySelector(`.film-details__comments-list`);

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

    api.getComments(film.id)
    .then((comments) => {
      this._commentModel.setComments(comments);
      this._renderComments(film, comments);
    });

    this._filmComponent.setClickOnFilm(this._onFilmClick);
    this._filmComponent.setClickOnAddToWatchlist(onClickAddToWatchlist);
    this._filmComponent.setClickOnAddToAlreadyWatched(onClickAlreadyWatched);
    this._filmComponent.setClickOnAddToFavorites(onClickAddToFavorites);

    this._filmPopupComponent.setClickOnCloseButton(this._onClosePopupClick);
    this._filmPopupComponent.setClickOnAddToWatchlist(onClickAddToWatchlist);
    this._filmPopupComponent.setClickOnAddToAlreadyWatched(onClickAlreadyWatched);
    this._filmPopupComponent.setClickOnAddToFavorites(onClickAddToFavorites);
    this._filmPopupComponent.setClickOnEmojiList();

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

  _renderComments(film, comments) {
    film.commentsId.forEach((commentId) => {
      const comment = comments.find((commentIdElement) => {
        if (commentIdElement.id === commentId) {
          return true;
        }
        return false;
      });

      const commentComponent = new Comment(comment);
      render(this._commentContainer, commentComponent, RenderPosition.BEFOREEND);
      commentComponent.setOnDeleteClick(() => {
        this._onCommentsDataChange(comment, null);
        commentComponent.remove();

        this._onDataChange(this, film, Object.assign({}, film, {
          commentsId: this._changeCommentsId(film, comment.id)
        }));
      });
    });
  }

  _changeCommentsId(film, commentId) {
    const newCommentsId = film.commentsId.slice();

    newCommentsId.find((item, index) => {
      if (item === commentId) {
        newCommentsId.splice(index, 1);
        return true;
      }

      return false;
    });

    return newCommentsId;
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

  _onClosePopupClick() {
    this._replacePopupToFilm();
    document.removeEventListener(`keydown`, this._onClosePopupClick);
    document.removeEventListener(`keydown`, this._onEscPress);
    document.removeEventListener(`keydown`, this._onFormSubmit);
  }

  _onFilmClick() {
    this._replaceFilmToPopup();
    document.addEventListener(`keydown`, this._onEscPress);
    document.addEventListener(`keydown`, this._onFormSubmit);
  }

  _onEscPress(evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      this._replacePopupToFilm();
      document.removeEventListener(`keydown`, this._onEscPress);
    }
  }

  _onFormSubmit(evt) {
    if ((evt.ctrlKey || evt.metaKey) && evt.key === KeyCode.ENTER) {
      evt.preventDefault();
      evt.stopPropagation();
    }
  }

  _onCommentsDataChange(oldData, newData) {
    if (newData === null) {
      this._commentModel.removeComment(oldData.id);
    } else if (oldData === null) {
      this._commentModel.addComment(newData);

      const commentComponent = new Comment(newData);
      render(this._commentContainer, commentComponent, RenderPosition.BEFOREEND);
      commentComponent.setOnDeleteClick(() => {
        this._onCommentsDataChange(newData, null);
        commentComponent.remove();
      });
    }
  }
}
