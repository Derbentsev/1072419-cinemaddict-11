import {createSortTemplate} from './sort-tpl';
import {AbstractComponent} from '../abstract-component';
import {SortType} from 'Consts/consts';


export class Sort extends AbstractComponent {
  constructor(sorts) {
    super();

    this._sorts = sorts;
    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate(this._sorts);
  }

  getSortType() {
    return this._currentSortType;
  }

  setOnChangeSortType(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;

      handler(this._currentSortType);
    });
  }
}
