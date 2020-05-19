import {AbstractComponent} from '@components/abstract-component';
import {createLoadingTemplate} from './loading-tpl';

export class LoadingComponent extends AbstractComponent {
  getTemplate() {
    return createLoadingTemplate();
  }
}
