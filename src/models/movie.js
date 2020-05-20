export class MovieModel {
  constructor(data) {
    this.id = data.id;

    this.commentsId = data.comments;

    this.name = data.film_info.title;
    this.actors = data.film_info.actors;
    this.ageRating = data.film_info.age_rating;
    this.alternativeName = data.film_info.alternative_title;
    this.description = data.film_info.description;
    this.director = data.film_info.director;
    this.genre = data.film_info.genre;
    this.poster = data.film_info.poster;
    this.releaseDate = data.film_info.release.date;
    this.country = data.film_info.release.release_country;
    this.duration = data.film_info.runtime;
    this.rating = data.film_info.total_rating;
    this.writers = data.film_info.writers;

    this.isWatchlist = data.user_details.watchlist;
    this.isWatched = data.user_details.already_watched;
    this.isFavorite = data.user_details.favorite;
    this.watchingDate = data.user_details.watching_date;
  }

  toRaw() {
    return {
      "id": this.id,

      "comments": this.commentsId,

      "film_info": {
        "title": this.name,
        "alternative_title": this.alternativeName,
        "total_rating": this.rating,
        "poster": this.poster,
        "age_rating": this.ageRating,
        "director": this.director,
        "writers": this.writers,
        "actors": this.actors,

        "release": {
          "date": this.releaseDate,
          "release_country": this.country,
        },

        "runtime": this.duration,
        "genre": this.genre,
        "description": this.description,
      },

      "user_details": {
        "watchlist": this.isWatchlist,
        "already_watched": this.isWatched,
        "watching_date": this.watchingDate,
        "favorite": this.isFavorite,
      }
    };
  }

  static parseMovie(data) {
    return new MovieModel(data);
  }

  static parseMovies(data) {
    return data.map(MovieModel.parseMovie);
  }

  static clone(data) {
    return new MovieModel(data.toRaw());
  }
}
