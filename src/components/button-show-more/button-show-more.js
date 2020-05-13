import {createButtonShowMore} from './button-show-more-tpl';
import {AbstractComponent} from '@components/abstract-component';


export class ButtonShowMore extends AbstractComponent {
  getTemplate() {
    return createButtonShowMore();
  }

  setOnButtonClick(cb) {
    this.getElement().addEventListener(`click`, cb);
  }
}
