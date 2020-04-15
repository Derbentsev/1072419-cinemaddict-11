import {UserProfile} from './components/user-profile.js';
import {SiteMenu} from './components/site-menu.js';
import {ButtonLoadMore} from './components/button-load-more.js';
import {Film} from './components/film.js';
import {FilmPopup} from './components/film-popup.js';
import {Filter} from './components/filter.js';
import {Sort} from './components/sort.js';
import {Statistic} from './components/statistic.js';
import {Comment} from './components/comment.js';
import {generateFilms} from './mocks/film.js';
import {generateFilters} from './mocks/filter.js';
import {generateSorts} from './mocks/sort.js';
import {generateComments} from './mocks/comment.js';
import {render} from './utils.js';
import {FilmSettings} from './consts.js';


const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`footer`);

const films = generateFilms(FilmSettings.COUNT);
const filters = generateFilters();
const sorts = generateSorts();

render(siteHeaderElement, UserProfile.getTemplate(), `beforeend`);
/* render(siteMainElement, createFilterTemplate(filters), `beforeend`);
render(siteMainElement, createSortTemplate(sorts), `beforeend`);
render(siteMainElement, createSiteMenu(), `beforeend`); */

/* const siteFilmsList = siteMainElement.querySelector(`.films-list`);
const siteFilmsBlock = siteFilmsList.querySelector(`.films-list__container`);
const siteTopRatedBlock = siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`)[0];
const siteMostCommentedBlock = siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`)[1];

films.slice(0, FilmSettings.SHOW_FILM_ON_START)
  .forEach((film) => render(siteFilmsBlock, createFilmCard(film), `beforeend`));

render(siteFilmsList, createButtonLoadMore(), `beforeend`);

const buttonLoadMore = siteMainElement.querySelector(`.films-list__show-more`);

let showingFilmsCount = FilmSettings.SHOW_FILM_ON_START;

buttonLoadMore.addEventListener(`click`, () => {
  const prevFilmCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + FilmSettings.SHOW_FILM_BUTTON_CLICK;

  films.slice(prevFilmCount, showingFilmsCount)
    .forEach((film) => render(siteFilmsBlock, createFilmCard(film), `beforeend`));
});

const topFilms = generateFilms(FilmSettings.TOP_COUNT);
topFilms.forEach((film) => {
  render(siteTopRatedBlock, createFilmCard(film), `beforeend`);
});

const mostCommentedFilms = generateFilms(FilmSettings.MOST_COMMENTED_COUNT);
mostCommentedFilms.forEach((film) => {
  render(siteMostCommentedBlock, createFilmCard(film), `beforeend`);
});

render(siteFooterElement, createStatisticMarkup(), `beforeend`);

render(siteBodyElement, createFilmPopup(films[0]), `beforeend`);

const comments = generateComments(FilmSettings.COMMENT_COUNT);
const commentBlock = siteBodyElement.querySelector(`.film-details__comments-list`);

comments.forEach((comment) => {
  render(commentBlock, createCommentMarkup(comment), `beforeend`);
}); */
