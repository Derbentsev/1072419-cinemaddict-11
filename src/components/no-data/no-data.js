import {createNoDataTemplate} from './no-data-tpl';
import {AbstractComponent} from '@components/abstract-component';


export class NoData extends AbstractComponent {
  getTemplate() {
    return createNoDataTemplate();
  }
}
