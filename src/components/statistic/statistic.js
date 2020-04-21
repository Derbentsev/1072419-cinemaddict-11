import {createStatisticMarkup} from './statistic-tpl.js';
import {createElement} from '../../utils.js';


class Statistic {
  constructor(filmCount) {
    this._element = null;
    this._filmCount = filmCount;
  }

  getTemplate(filmCount) {
    return createStatisticMarkup(filmCount);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(this._filmCount));
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


export {
  Statistic
};
