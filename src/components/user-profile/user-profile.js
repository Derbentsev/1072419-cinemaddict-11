import {createUserProfile} from './user-profile-tpl';
import {getUserRating} from '@utils/common';
import AbstractComponent from '@components/abstract-component';


export default class UserProfile extends AbstractComponent {
  constructor(moviesModel) {
    super();

    this._moviesModel = moviesModel;

    this._userRating = ``;

    this._getWatchedMovies = this._getWatchedMovies.bind(this);
    this._changeUserRating = this._changeUserRating.bind(this);
    this._getUserRating = this._getUserRating.bind(this);
  }

  getTemplate() {
    this._userRating = this._getUserRating();

    this._moviesModel.setOnDataChange(this._changeUserRating);

    return createUserProfile(this._userRating);
  }

  getCurrentUserRating() {
    return this._userRating;
  }


  _getUserRating() {
    const watchedMovies = this._getWatchedMovies();
    return getUserRating(watchedMovies.length);
  }

  _getWatchedMovies() {
    return this._moviesModel.getMoviesAll().filter((movie) => {
      if (this._lastWatchingDate !== null) {
        return movie.isWatched;
      }

      return true;
    });
  }

  _changeUserRating() {
    this._userRating = this._getUserRating();

    this.getElement().querySelector(`.profile__rating`).textContent = this._userRating;
  }
}
