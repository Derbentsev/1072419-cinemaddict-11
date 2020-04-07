const FilmSettings = {
  COUNT: 5,
  EXTRA_COUNT: 2
};

import {createUserProfile} from './components/userProfile.js';
import {createSiteMenu} from './components/siteMenu.js';
import {createFilmCard} from './components/filmCard.js';
import {createButtonLoadMore} from './components/buttonLoadMore.js';
import {render} from './components/rendering.js';


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, createUserProfile(), `beforeend`);
render(siteMainElement, createSiteMenu(), `beforeend`);

const siteFilmsList = siteMainElement.querySelector(`.films-list`);
const siteFilmsBlock = siteFilmsList.querySelector(`.films-list__container`);
const siteTopRatedBlock = siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`)[0];
const siteMostCommentedBlock = siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`)[1];

for (let i = 0; i < FilmSettings.COUNT; i++) {
  render(siteFilmsBlock, createFilmCard(), `beforeend`);
}

render(siteFilmsList, createButtonLoadMore(), `beforeend`);

for (let i = 0; i < FilmSettings.EXTRA_COUNT; i++) {
  render(siteTopRatedBlock, createFilmCard(), `beforeend`);
}

for (let i = 0; i < FilmSettings.EXTRA_COUNT; i++) {
  render(siteMostCommentedBlock, createFilmCard(), `beforeend`);
}
