import Film from "@components/film/film";
import FilmPopup from '@components/film-popup/film-popup';
import CommentComponent from '@components/comment/comment';
import MovieModel from '@models/movie';
import CommentModel from '@models/comment';
import {
  render,
  replace,
  remove,
} from '@utils/render';
import {
  RenderPosition,
  KeyCode,
  FilmMode,
} from '@consts';


const parseCommentData = (commentData) => {
  return new CommentModel({
    comment: commentData.comment,
    emotion: commentData.emoji.split(`/`).pop().split(`.`)[0],
    author: ``,
    date: new Date(),
  });
};


export default class MovieController {
  constructor(filmListComponent, onDataChange, onViewChange, api, onCommentDataChange) {
    this._filmListComponent = filmListComponent;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._onCommentDataChange = onCommentDataChange;
    this._api = api;

    this._mode = FilmMode.DEFAULT;
    this._showedCommentsControllers = [];

    this._scrollTop = 0;

    this._film = null;
    this._filmComponent = null;
    this._filmPopupComponent = null;
    this._commentContainer = null;
    this._commentsModel = null;

    this._renderComments = this._renderComments.bind(this);
    this._onFilmClick = this._onFilmClick.bind(this);
    this._onClosePopupClick = this._onClosePopupClick.bind(this);
    this._onEscPress = this._onEscPress.bind(this);
    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onCommentsDataChange = this._onCommentsDataChange.bind(this);
  }

  render(film, commentsModel) {
    const oldFilmComponent = this._filmComponent;
    const oldFilmPopupComponent = this._filmPopupComponent;
    const filmListContainer = this._filmListComponent.getCommentListElement();

    if (this._filmComponent) {
      this._scrollTop = this._filmPopupComponent.getElement().scrollTop;
    }

    this._film = film;
    this._commentsModel = commentsModel;

    this._filmComponent = new Film(this._film);
    this._filmPopupComponent = new FilmPopup(this._film);
    this._commentContainer = this._filmPopupComponent.getCommentListElement();

    const onClickAddToWatchlist = (evt) => {
      evt.preventDefault();

      const newMovie = MovieModel.clone(this._film);
      newMovie.isWatchlist = !newMovie.isWatchlist;

      this._onDataChange(this, this._film, newMovie);
    };

    const onClickAlreadyWatched = (evt) => {
      evt.preventDefault();

      const newMovie = MovieModel.clone(this._film);
      newMovie.isWatched = !newMovie.isWatched;
      newMovie.watchingDate = newMovie.isWatched ? new Date() : null;

      this._onDataChange(this, this._film, newMovie);
    };

    const onClickAddToFavorites = (evt) => {
      evt.preventDefault();

      const newMovie = MovieModel.clone(this._film);
      newMovie.isFavorite = !newMovie.isFavorite;

      this._onDataChange(this, this._film, newMovie);
    };

    this._api.getComments(this._film.id)
      .then((comments) => {
        this._commentsModel.setComments(comments);
        this._renderComments(this._film, comments);
      });

    this._filmComponent.setClickOnFilmCard(this._onFilmClick);
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

    this._filmPopupComponent.getElement().scrollTop = this._scrollTop;

    render(filmListContainer, this._filmComponent, RenderPosition.BEFOREEND);
  }

  setDefaultView() {
    if (this._mode !== FilmMode.DEFAULT) {
      this._replacePopupToFilm();
    }
  }

  destroy() {
    if (this._mode === FilmMode.EDIT) {
      this._mode = FilmMode.DELAY_DESTROY;
    } else {
      remove(this._filmPopupComponent);
      document.removeEventListener(`keydown`, this._onEscPress);
    }

    remove(this._filmComponent);
  }


  _renderComments(film, comments) {
    film.commentsId.forEach((commentId) => {
      const comment = comments.find((commentIdElement) => {
        return (commentIdElement.id === commentId);
      });

      const commentComponent = new CommentComponent(comment);
      render(this._commentContainer, commentComponent, RenderPosition.BEFOREEND);

      this._filmPopupComponent.getElement().scrollTop = this._scrollTop;

      commentComponent.setOnDeleteClick((evt) => {
        evt.preventDefault();

        commentComponent.toggleDisableDeleteButton();

        this._onCommentsDataChange(comment, null)
          .then(() => {
            this._commentsModel.removeComment(comment.id);
            commentComponent.remove();

            const newMovie = MovieModel.clone(this._film);
            newMovie.commentsId = this._removeCommentById(film, comment.id);

            this._onCommentDataChange(this, film, newMovie);
          })
          .catch(() => {
            commentComponent.toggleDisableDeleteButton();
            this._filmPopupComponent.shakeNewCommentForm();
          });
      });
    });
  }

  _removeCommentById(film, commentId) {
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
    this._filmListComponent.removePopupElement(this._filmPopupComponent.getElement());
    this._mode = FilmMode.DEFAULT;
  }

  _replaceFilmToPopup() {
    this._onViewChange();

    this._filmListComponent.createPopupComponent(this._filmPopupComponent.getElement());
    this._mode = FilmMode.EDIT;
  }

  _onClosePopupClick() {
    if (this._mode === FilmMode.DELAY_DESTROY) {
      this.destroy();
    } else {
      this._replacePopupToFilm();
      this._filmPopupComponent.clearNewComment();
    }

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
      this._onClosePopupClick();
    }
  }

  _onFormSubmit(evt) {
    if ((evt.ctrlKey || evt.metaKey) && evt.key === KeyCode.ENTER) {
      evt.preventDefault();

      this._scrollTop = this._filmPopupComponent.getElement().scrollTop;

      this._filmPopupComponent.toggleBlockingPopupForm();

      const newCommentData = this._filmPopupComponent.getNewCommentData();

      if (newCommentData) {
        const data = parseCommentData(newCommentData);
        this._onCommentsDataChange(null, data);
      }

      this._filmPopupComponent.toggleBlockingPopupForm();
    }
  }

  _onCommentsDataChange(oldData, newData) {
    if (newData === null) {
      return this._api.deleteComment(oldData.id);
    } else if (oldData === null) {
      this._filmPopupComponent.toggleBlockingPopupForm();

      this._api.createComment(this._film.id, newData)
        .then((response) => {
          this._commentsModel.addComment(newData);

          const commentComponent = new CommentComponent(newData);
          render(this._commentContainer, commentComponent, RenderPosition.BEFOREEND);

          commentComponent.setOnDeleteClick(() => {
            this._onCommentsDataChange(newData, null);
            commentComponent.remove();
          });

          const newMovie = MovieModel.clone(this._film);
          newMovie.commentsId = response.movie.comments;

          this._onCommentDataChange(this, this._film, newMovie);

          this._filmPopupComponent.getElement().scrollTop = this._scrollTop;
        })
        .catch((err) => {
          this._filmPopupComponent.shakeForm();
          this._filmPopupComponent.toggleBlockingPopupForm();

          throw new Error(err);
        });
    }

    return true;
  }
}
