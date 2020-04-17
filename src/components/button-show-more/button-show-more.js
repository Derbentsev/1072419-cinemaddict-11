import {createElement} from '../../utils.js';
import {createButtonShowMore} from './button-show-more-tpl.js';


class ButtonShowMore {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createButtonShowMore();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}


export {ButtonShowMore};
