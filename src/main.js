import {UserProfile} from '@components/user-profile/user-profile';
import {FooterStatistic} from '@components/footer-statistic/footer-statistic';
import {API} from './api';
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
  STATS_NAME,
  AUTHORIZATION,
} from '@consts';


const _onStatsClick = ((filterType) => {
  switch (filterType) {
    case STATS_NAME:
      pageController.hide();
      statisticComponent.show();
      break;
    default:
      statisticComponent.hide();
      pageController.show();
  }
});

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`footer`);

const comments = generateComments(FilmSettings.COMMENT_COUNT);
const api = new API(AUTHORIZATION);

const commentModel = new CommentModel();
const moviesModel = new MoviesModel();

commentModel.setComments(comments);

api.getMovies()
  .then((movies) => {
    moviesModel.setMovies(movies);
  });

const filmBoardComponent = new FilmBoard();
const statisticComponent = new StatisticComponent(moviesModel);

const pageController = new PageController(filmBoardComponent, moviesModel, commentModel);
const filterController = new FilterController(siteMainElement, moviesModel, _onStatsClick);

filterController.render();
render(siteHeaderElement, new UserProfile(), RenderPosition.BEFOREEND);
render(siteMainElement, statisticComponent, RenderPosition.BEFOREEND);
render(siteMainElement, filmBoardComponent, RenderPosition.BEFOREEND);
render(siteFooterElement, new FooterStatistic(moviesModel.getMovies().length), RenderPosition.BEFOREEND);

pageController.render();

statisticComponent.hide();
pageController.show();
