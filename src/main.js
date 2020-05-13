import {UserProfile} from '@components/user-profile/user-profile';
import {Statistic} from '@components/statistic/statistic';
import {generateFilms} from './mocks/film';
import {generateComments} from './mocks/comment';
import {render} from '@utils/render';
import {PageController} from '@controllers/page';
import {FilmBoard} from '@components/film-board/film-board';
import {MoviesModel} from '@models/movies';
import {CommentModel} from '@models/comments';
import {FilterController} from '@controllers/filter';
import {
  FilmSettings,
  RenderPosition
} from '@consts';


const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`footer`);

const comments = generateComments(FilmSettings.COMMENT_COUNT);
const films = generateFilms(FilmSettings.COUNT, comments);

const filmBoard = new FilmBoard();
const commentModel = new CommentModel();
const moviesModel = new MoviesModel();

commentModel.setComments(comments);
moviesModel.setMovies(films);

const pageController = new PageController(filmBoard, moviesModel, commentModel);
const filterController = new FilterController(siteMainElement, moviesModel);
filterController.render();

render(siteHeaderElement, new UserProfile(), RenderPosition.BEFOREEND);

render(siteMainElement, filmBoard, RenderPosition.BEFOREEND);
pageController.render();

render(siteFooterElement, new Statistic(films.length), RenderPosition.BEFOREEND);
