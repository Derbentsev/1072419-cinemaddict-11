import {createSortTemplate} from './sort-tpl';
import {AbstractComponent} from '../abstract-component';


export class Sort extends AbstractComponent {
  constructor(sorts) {
    super();

    this._sorts = sorts;
  }

  getTemplate() {
    return createSortTemplate(this._sorts);
  }
}
