import {createFilterTemplate} from './filter-tpl.js';
import {createElement} from '../../utils.js';


class Filter {
  constructor(filters) {
    this._element = null;
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(this._filters));
    }

    return this._element;
  }
}


export {
  Filter
};
