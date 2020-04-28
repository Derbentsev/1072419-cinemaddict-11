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
  render
} from '../utils/render';
import {
  RenderPosition
} from '../consts';


export class MovieController {
  constructor(container) {
    this._container = container;

    this._filmComponent = null;
    this._filPopupComponent = null;
  }

  render(film, comments) {
    const onFilmCLick = () => {
      this._container.parentElement.appendChild(this._filPopupComponent.getElement());
      document.addEventListener(`keydown`, onClosePopupClick);
    };

    const onClosePopupClick = () => {
      this._container.parentElement.removeChild(this._filPopupComponent.getElement());
      document.removeEventListener(`keydown`, onClosePopupClick);
    };

    this._filmComponent = new Film(film);
    const filmListContainer = this._container.querySelector(`.films-list__container`);
    this._filmComponent.setOnFilmClick(onFilmCLick);

    render(filmListContainer, this._filmComponent, RenderPosition.BEFOREEND);

    this._filPopupComponent = new FilmPopup(film);
    const commentBlock = this._filPopupComponent.getElement().querySelector(`.film-details__comments-list`);

    comments.forEach((comment) => {
      render(commentBlock, new Comment(comment), RenderPosition.BEFOREEND);
    });

    this._filPopupComponent.setOnClickCLoseButton(onClosePopupClick);
  }
}
