import {createUserProfile} from './components/userProfile.js';
import {createSiteMenu} from './components/siteMenu.js';
import {createFilmCard} from './components/film.js';
import {createButtonLoadMore} from './components/buttonLoadMore.js';
import {render} from './components/rendering.js';
import {generateFilms} from './mocks/film.js';

const FilmSettings = {
  COUNT: 5,
  TOP_COUNT: 2,
  MOST_COMMENTED_COUNT: 3
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, createUserProfile(), `beforeend`);
render(siteMainElement, createSiteMenu(), `beforeend`);

const siteFilmsList = siteMainElement.querySelector(`.films-list`);
const siteFilmsBlock = siteFilmsList.querySelector(`.films-list__container`);
const siteTopRatedBlock = siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`)[0];
const siteMostCommentedBlock = siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`)[1];

const films = generateFilms(FilmSettings.COUNT);
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
