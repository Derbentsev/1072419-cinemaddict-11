import {createSortTemplate} from './sort-tpl.js';
import {createElement} from '../../utils.js';


class Sort {
  constructor(sorts) {
    this._element = null;
    this._sorts = sorts;
  }

  getTemplate() {
    return createSortTemplate(this._sorts);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(this._sorts));
    }

    return this._element;
  }
}


export {
  Sort
};
