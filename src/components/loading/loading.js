import AbstractComponent from '@components/abstract-component';
import {createLoadingTemplate} from './loading-tpl';

export default class Loading extends AbstractComponent {
  getTemplate() {
    return createLoadingTemplate();
  }
}
