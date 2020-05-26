import {createUserProfile} from './user-profile-tpl';
import AbstractComponent from '@components/abstract-component';


export default class UserProfile extends AbstractComponent {
  constructor(moviesModel) {
    super();

    this._moviesModel = moviesModel;
    this._getWatchedMovies = this._getWatchedMovies.bind(this);
  }

  getTemplate() {
    const watchedMovies = this._getWatchedMovies();
    return createUserProfile(watchedMovies.length);
  }


  _getWatchedMovies() {
    return this._moviesModel.getMoviesAll().filter((movie) => {
      if (this._lastWatchingDate !== null) {
        return movie.isWatched;
      }

      return true;
    });
  }
}
