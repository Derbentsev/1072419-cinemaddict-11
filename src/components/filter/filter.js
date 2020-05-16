import {createFilterTemplate} from './filter-tpl';
import {AbstractComponent} from '@components/abstract-component';
import {STATS_NAME} from '@consts';


export class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setOnFilterChange(handler) {
    this.getElement().querySelector(`.main-navigation__items`).addEventListener(`click`, (evt) => {
      const filterName = this._getFilterNameByText(evt.target.text);

      this.getElement().querySelector(`.main-navigation__item--active`).classList.remove(`main-navigation__item--active`);
      evt.target.classList.add(`main-navigation__item--active`);

      handler(filterName);
    });

    this.getElement().querySelector(`.main-navigation__additional`).addEventListener(`click`, () => {
      handler(STATS_NAME);
    });
  }

  _getFilterNameByText(text) {
    return text.split(` `)[0];
  }
}
