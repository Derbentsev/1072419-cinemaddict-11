import {createFilterTemplate} from './filter-tpl';
import {AbstractComponent} from '../abstract-component';


export class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }
}
