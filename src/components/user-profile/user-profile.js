import {createUserProfile} from './user-profile-tpl.js';


class UserProfile {
  constructor() {

  }

  getTemplate() {
    return createUserProfile();
  }
}


export {UserProfile};
