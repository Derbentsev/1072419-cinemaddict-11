import {createSiteMenu} from './site-menu-tpl.js';
import {createElement} from '../../utils.js';


class SiteMenu {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSiteMenu();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}


export {SiteMenu};
