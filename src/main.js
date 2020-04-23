import {
  UserProfile
} from './components/user-profile/user-profile';
import {
  Filter
} from './components/filter/filter';
import {
  Sort
} from './components/sort/sort';
import {
  Statistic
} from './components/statistic/statistic';
import {
  generateFilms
} from './mocks/film';
import {
  generateFilters
} from './mocks/filter';
import {
  generateSorts
} from './mocks/sort';
import {
  render
} from './utils/render';
import {
  FilmSettings,
  RenderPosition
} from './consts';
import {
  PageController
} from './controllers/page';
import {
  FilmBoard
} from './components/film-board/film-board';
import {
  generateComments
} from './mocks/comment';


const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`footer`);


/**
 * Отрисовываем блоки Фильтра, Сортировки и Аватарки пользователя
 */
const renderSortsAndFilters = () => {
  render(siteHeaderElement, new UserProfile(), RenderPosition.BEFOREEND);
  render(siteMainElement, new Filter(filters), RenderPosition.BEFOREEND);
  render(siteMainElement, new Sort(sorts), RenderPosition.BEFOREEND);
};

/**
 * Отрисовываем блок статистики
 */
const renderStatistic = () => {
  render(siteFooterElement, new Statistic(films.length), RenderPosition.BEFOREEND);
};


const films = generateFilms(FilmSettings.COUNT);
const topFilms = generateFilms(FilmSettings.TOP_COUNT);
const mostCommentedFilms = generateFilms(FilmSettings.MOST_COMMENTED_COUNT);
const sorts = generateSorts(films);
const filters = generateFilters(films);
const comments = generateComments(FilmSettings.COMMENT_COUNT);


renderSortsAndFilters();

const filmBoard = new FilmBoard();
const pageController = new PageController(filmBoard);

render(siteMainElement, filmBoard, RenderPosition.BEFOREEND);
pageController.render(films, topFilms, mostCommentedFilms, comments);

renderStatistic();
