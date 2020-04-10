import {createUserProfile} from './components/userProfile.js';
import {createSiteMenu} from './components/siteMenu.js';
import {createButtonLoadMore} from './components/buttonLoadMore.js';
import {render} from './components/rendering.js';
import {createFilmCard} from './components/film.js';
import {generateFilms} from './mocks/film.js';
import {createFilmPopup} from './components/filmPopup.js';
import {generateFilmPopup} from './mocks/filmPopup.js';


const FilmSettings = {
  COUNT: 20,
  TOP_COUNT: 2,
  MOST_COMMENTED_COUNT: 3,
  SHOW_FILM_ON_START: 5,
  SHOW_FILM_BY_BUTTON: 5,
};

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);

render(siteHeaderElement, createUserProfile(), `beforeend`);
render(siteMainElement, createSiteMenu(), `beforeend`);

const siteFilmsList = siteMainElement.querySelector(`.films-list`);
const siteFilmsBlock = siteFilmsList.querySelector(`.films-list__container`);
const siteTopRatedBlock = siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`)[0];
const siteMostCommentedBlock = siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`)[1];

const films = generateFilms(FilmSettings.SHOW_FILM_ON_START);
films.forEach((film) => {
  render(siteFilmsBlock, createFilmCard(film), `beforeend`);
});

render(siteFilmsList, createButtonLoadMore(), `beforeend`);

const topFilms = generateFilms(FilmSettings.TOP_COUNT);
topFilms.forEach((film) => {
  render(siteTopRatedBlock, createFilmCard(film), `beforeend`);
});

const mostCommentedFilms = generateFilms(FilmSettings.MOST_COMMENTED_COUNT);
mostCommentedFilms.forEach((film) => {
  render(siteMostCommentedBlock, createFilmCard(film), `beforeend`);
});

const popupFilm = generateFilmPopup(FilmSettings.POPUP_COUNT);
render(siteBodyElement, createFilmPopup(popupFilm), `beforeend`);
