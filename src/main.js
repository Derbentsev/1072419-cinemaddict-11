import {
  UserProfile
} from './components/user-profile/user-profile';
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
  render
} from 'Utils/render';
import {
  FilmSettings,
  RenderPosition
} from 'Consts/consts';
import {
  PageController
} from './controllers/page';
import {
  FilmBoard
} from './components/film-board/film-board';
import {
  generateComments
} from './mocks/comment';
import {
  MoviesModel
} from './models/movies';
import {
  FilterController
} from './controllers/filter';


const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`footer`);

const films = generateFilms(FilmSettings.COUNT);
const topFilms = generateFilms(FilmSettings.TOP_COUNT);
const mostCommentedFilms = generateFilms(FilmSettings.MOST_COMMENTED_COUNT);
const filters = generateFilters(films);
const comments = generateComments(FilmSettings.COMMENT_COUNT);

const filmBoard = new FilmBoard();

const moviesModel = new MoviesModel();
moviesModel.setMovies(films);

const pageController = new PageController(filmBoard, moviesModel);

const filterController = new FilterController(siteMainElement, moviesModel, filters);
filterController.render();

render(siteHeaderElement, new UserProfile(), RenderPosition.BEFOREEND);

render(siteMainElement, filmBoard, RenderPosition.BEFOREEND);
pageController.render(topFilms, mostCommentedFilms, comments);

render(siteFooterElement, new Statistic(films.length), RenderPosition.BEFOREEND);
