import {createSortTemplate} from './sort-tpl.js';


class Sort {
  constructor(sorts) {
    this._sorts = sorts;
  }

  getTemplate() {
    return createSortTemplate(this._sorts);
  }
}


export {
  Sort
};
