import {createStatisticMarkup} from './statistic-tpl.js';
import {createElement} from '../../utils.js';


class Statistic {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createStatisticMarkup();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}


export {
  Statistic
};
