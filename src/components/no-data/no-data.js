import {createNoDataTemplate} from './no-data-tpl.js';
import {createElement} from '../../utils.js';


class NoData {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoDataTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}


export {NoData};
