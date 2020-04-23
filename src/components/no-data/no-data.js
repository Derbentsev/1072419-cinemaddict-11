import {createNoDataTemplate} from './no-data-tpl';
import { AbstractComponent } from '../abstract-component';


export class NoData extends AbstractComponent {
  getTemplate() {
    return createNoDataTemplate();
  }
}
