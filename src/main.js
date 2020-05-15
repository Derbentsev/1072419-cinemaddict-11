import {UserProfile} from '@components/user-profile/user-profile';
import {FooterStatistic} from '@components/footer-statistic/footer-statistic';
import {generateFilms} from './mocks/film';
import {generateComments} from './mocks/comment';
import {render} from '@utils/render';
import {PageController} from '@controllers/page';
import {FilmBoard} from '@components/film-board/film-board';
import {StatisticComponent} from '@components/statistic/statistic';
import {MoviesModel} from '@models/movies';
import {CommentModel} from '@models/comments';
import {FilterController} from '@controllers/filter';
import {
  FilmSettings,
  RenderPosition,
} from '@consts';


const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`footer`);

const comments = generateComments(FilmSettings.COMMENT_COUNT);
const films = generateFilms(FilmSettings.COUNT, comments);

const commentModel = new CommentModel();
const moviesModel = new MoviesModel();

const filmBoardComponent = new FilmBoard();

commentModel.setComments(comments);
moviesModel.setMovies(films);

const statisticComponent = new StatisticComponent(moviesModel);

const pageController = new PageController(filmBoardComponent, moviesModel, commentModel);
const filterController = new FilterController(siteMainElement, moviesModel);

filterController.render();
render(siteHeaderElement, new UserProfile(), RenderPosition.BEFOREEND);
render(siteMainElement, statisticComponent, RenderPosition.BEFOREEND);
render(siteMainElement, filmBoardComponent, RenderPosition.BEFOREEND);
render(siteFooterElement, new FooterStatistic(films.length), RenderPosition.BEFOREEND);

pageController.render();


// statisticComponent.hide();
// pageController.show();

pageController.hide();
statisticComponent.show();
