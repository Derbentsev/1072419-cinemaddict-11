import {createFilterTemplate} from './filter-tpl.js';


class Filter {
  constructor(filters) {
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }
}


export {
  Filter
};
