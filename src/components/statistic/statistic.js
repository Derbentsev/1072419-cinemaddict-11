import {createStatisticMarkup} from './statistic-tpl';
import {AbstractComponent} from '../abstract-component';


export class Statistic extends AbstractComponent {
  constructor(filmCount) {
    super();

    this._filmCount = filmCount;
  }

  getTemplate() {
    return createStatisticMarkup(this._filmCount);
  }
}
