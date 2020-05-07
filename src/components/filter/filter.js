import {createFilterTemplate} from './filter-tpl';
import {AbstractComponent} from '../abstract-component';


export class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setOnFilterChange(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const filterName = this._getFilterNameByText(evt.target.text);
      handler(filterName);
    });
  }

  _getFilterNameByText(text) {
    return text.split(` `)[0];
  }
}
