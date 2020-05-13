import {createUserProfile} from './user-profile-tpl';
import {AbstractComponent} from '@components/abstract-component';


export class UserProfile extends AbstractComponent {
  getTemplate() {
    return createUserProfile();
  }
}
