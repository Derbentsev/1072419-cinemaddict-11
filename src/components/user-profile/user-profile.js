import {createUserProfile} from './user-profile-tpl.js';
import {createElement} from '../../utils.js';


class UserProfile {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createUserProfile();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


export {UserProfile};
