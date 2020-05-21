import {FilterType} from '@consts';


export class MoviesModel {
  constructor() {
    this._movies = [];
    this._activeFilterType = FilterType.ALL;

    this._onFilterChange = [];
    this._onDataChange = [];
  }

  getMoviesAll() {
    return this._movies;
  }

  getMovies() {
    return this.getMoviesByFilter(this._movies, this._activeFilterType);
  }

  setMovies(movies) {
    this._movies = Array.from(movies);
  }

  updateMovies(id, newMovie) {
    const index = this._movies.findIndex((it) => it.id === id);

    if (index === -1) {
      return;
    }

    this._movies = [].concat(this._movies.slice(0, index), newMovie, this._movies.slice(index + 1));

    this._callHandlers(this._onDataChange);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._onFilterChange);
  }

  setOnFilterChange(handler) {
    this._onFilterChange.push(handler);
  }

  setOnDataChange(handler) {
    this._onDataChange.push(handler);
  }

  getMoviesByFilter(movies, filterType) {
    switch (filterType) {
      case FilterType.ALL:
        return movies;
      case FilterType.WATCHLIST:
        return this._getWatchlistMovies(movies);
      case FilterType.HISTORY:
        return this._getWatchedMovies(movies);
      case FilterType.FAVORITES:
        return this._getFavoritesMovies(movies);
    }

    return movies;
  }

  _getWatchlistMovies(movies) {
    return movies.filter((movie) => movie.isWatchlist);
  }

  _getWatchedMovies(movies) {
    return movies.filter((movie) => movie.isWatched);
  }

  _getFavoritesMovies(movies) {
    return movies.filter((movie) => movie.isFavorite);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
