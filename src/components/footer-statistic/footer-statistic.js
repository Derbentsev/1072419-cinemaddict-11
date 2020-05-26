import {createFooterStatisticMarkup} from './footer-statistic-tpl';
import AbstractComponent from '@components/abstract-component';


export default class FooterStatistic extends AbstractComponent {
  constructor(filmCount) {
    super();

    this._filmCount = filmCount;
  }

  getTemplate() {
    return createFooterStatisticMarkup(this._filmCount);
  }
}
