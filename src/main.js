import {UserProfile} from './components/user-profile/user-profile.js';
import {SiteMenu} from './components/site-menu/site-menu.js';
import {ButtonShowMore} from './components/button-show-more/button-show-more.js';
import {Film} from './components/film/film.js';
import {FilmPopup} from './components/film-popup/film-popup.js';
import {Filter} from './components/filter/filter.js';
import {Sort} from './components/sort/sort.js';
import {Statistic} from './components/statistic/statistic.js';
import {Comment} from './components/comment/comment.js';
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

render(siteHeaderElement, new UserProfile().getElement(), `beforeend`);
render(siteMainElement, new Filter(filters).getElement(), `beforeend`);
render(siteMainElement, new Sort(sorts).getElement(), `beforeend`);
render(siteMainElement, new SiteMenu().getElement(), `beforeend`);

const siteFilmsList = siteMainElement.querySelector(`.films-list`);
const siteFilmsBlock = siteFilmsList.querySelector(`.films-list__container`);
const siteTopRatedBlock = siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`)[0];
const siteMostCommentedBlock = siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`)[1];

films.slice(0, FilmSettings.SHOW_FILMS_ON_START)
  .forEach((film) => render(siteFilmsBlock, new Film(film).getElement(), `beforeend`));

render(siteFilmsList, new ButtonShowMore().getElement(), `beforeend`);

const buttonLoadMore = siteMainElement.querySelector(`.films-list__show-more`);

let showingFilmsCount = FilmSettings.SHOW_FILMS_ON_START;

buttonLoadMore.addEventListener(`click`, () => {
  const prevFilmCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + FilmSettings.SHOW_FILMS_BUTTON_CLICK;

  films.slice(prevFilmCount, showingFilmsCount)
    .forEach((film) => render(siteFilmsBlock, new Film(film).getElement(), `beforeend`));
});

const topFilms = generateFilms(FilmSettings.TOP_COUNT);
topFilms.forEach((film) => {
  render(siteTopRatedBlock, new Film(film).getElement(), `beforeend`);
});

const mostCommentedFilms = generateFilms(FilmSettings.MOST_COMMENTED_COUNT);
mostCommentedFilms.forEach((film) => {
  render(siteMostCommentedBlock, new Film(film).getElement(), `beforeend`);
});

render(siteFooterElement, new Statistic().getElement(), `beforeend`);

// отключил временно - НЕ удалять!
/* render(siteBodyElement, new FilmPopup(films[0]).getElement(), `beforeend`);

const comments = generateComments(FilmSettings.COMMENT_COUNT);
const commentBlock = siteBodyElement.querySelector(`.film-details__comments-list`);

comments.forEach((comment) => {
  render(commentBlock, new Comment(comment).getElement(), `beforeend`);
}); */
