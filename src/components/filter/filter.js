import {createFilterTemplate} from './filter-tpl';
import AbstractComponent from '@components/abstract-component';
import {STATS_NAME} from '@consts';


export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;

    this._onClickHandler = null;

    this._onFilterLinkClick = this._onFilterLinkClick.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setOnFilterChange(handler) {
    this._onClickHandler = handler;

    this.getElement().querySelectorAll(`.main-navigation__item`).forEach((filter) => {
      filter.addEventListener(`click`, this._onFilterLinkClick);
    });

    this.getElement().querySelector(`.main-navigation__additional`).addEventListener(`click`, (evt) => {
      this.getElement().querySelector(`.main-navigation__item--active`).classList.remove(`main-navigation__item--active`);
      evt.target.classList.add(`main-navigation__item--active`);

      this._onClickHandler(STATS_NAME);
    });
  }


  _onFilterLinkClick(evt) {
    if (!evt.currentTarget.classList.contains(`main-navigation__item--active`)) {
      const filterName = evt.currentTarget.dataset.type;

      this.getElement().querySelector(`.main-navigation__item--active`).classList.remove(`main-navigation__item--active`);
      evt.currentTarget.classList.add(`main-navigation__item--active`);

      this._onClickHandler(filterName);
    }
  }
}
