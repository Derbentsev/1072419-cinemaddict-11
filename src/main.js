import {UserProfile} from '@components/user-profile/user-profile';
import {LoadingComponent} from '@components/loading/loading';
import {FooterStatistic} from '@components/footer-statistic/footer-statistic';
import {API} from '@api/api';
import {Provider} from '@api/provider';
import {Store} from '@api/store';
import {PageController} from '@controllers/page';
import {FilmBoard} from '@components/film-board/film-board';
import {StatisticComponent} from '@components/statistic/statistic';
import {MoviesModel} from '@models/movies';
import {MovieModel} from '@models/movie';
import {FilterController} from '@controllers/filter';
import {
  render,
  remove,
} from '@utils/render';
import {
  RenderPosition,
  StatsMode,
  STATS_NAME,
  AUTHORIZATION,
  StoreSettings,
} from '@consts';


const _onStatsClick = ((filterType) => {
  switch (filterType) {
    case STATS_NAME:
      pageController.hide();
      statisticComponent.rerender(StatsMode.ALL);
      statisticComponent.show();
      break;
    default:
      statisticComponent.hide();
      pageController.show();
      break;
  }
});

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`footer`);

const api = new API(AUTHORIZATION);
const store = new Store(StoreSettings.NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const moviesModel = new MoviesModel();

const filmBoardComponent = new FilmBoard();
const statisticComponent = new StatisticComponent(moviesModel);
const pageController = new PageController(filmBoardComponent, moviesModel, apiWithProvider);
const filterController = new FilterController(siteMainElement, moviesModel, _onStatsClick);

const loadingComponent = new LoadingComponent();
render(siteMainElement, loadingComponent, RenderPosition.BEFOREEND);

apiWithProvider.getMovies()
  .then(MovieModel.parseMovies)
  .then((movies) => {
    remove(loadingComponent);

    moviesModel.setMovies(movies);

    filterController.render();
    render(siteHeaderElement, new UserProfile(), RenderPosition.BEFOREEND);
    render(siteMainElement, statisticComponent, RenderPosition.BEFOREEND);
    statisticComponent.rerender(`all`);
    render(siteMainElement, filmBoardComponent, RenderPosition.BEFOREEND);
    render(siteFooterElement, new FooterStatistic(moviesModel.getMovies().length), RenderPosition.BEFOREEND);
    pageController.render();

    statisticComponent.hide();
    pageController.show();
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
