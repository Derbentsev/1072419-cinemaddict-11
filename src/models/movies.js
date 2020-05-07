import {
  FilterType
} from '../consts';


export class MoviesModel {
  constructor() {
    this._movies = [];
    this._activeFilterType = FilterType.ALL;

    this._onFilterChange = [];
  }

  getMoviesAll() {
    return this._movies;
  }

  getMovies() {
    return this.getMoviesByFilter();
  }

  setMovies(movies) {
    this._movies = movies;
  }

  updateMovies(id, newMovie) {
    const index = this._movies.findIndex((it) => it.id === id);

    if (index === -1) {
      return;
    }

    this._movies = [].concat(this._movies.slice(0, index), newMovie, this._movies.slice(index + 1));
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._onFilterChange);
  }

  setOnFilterChange(handler) {
    this._onFilterChange.push(handler);
  }

  _getWatchlistMovies() {
    return this._movies.filter((movie) => movie.isWatchlist);
  }

  _getWatchedMovies() {
    return this._movies.filter((movie) => movie.isWatched);
  }

  _getFavoritesMovies() {
    return this._movies.filter((movie) => movie.isFavorite);
  }

  getMoviesByFilter() {
    switch (this._activeFilterType) {
      case FilterType.All:
        return this._movies;
      case FilterType.WATCHLIST:
        return this._getWatchlistMovies();
      case FilterType.HISTORY:
        return this._getWatchedMovies();
      case FilterType.FAVORITES:
        return this._getFavoritesMovies();
    }

    return this._movies;
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
