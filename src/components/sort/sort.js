import {createSortTemplate} from './sort-tpl';
import {AbstractComponent} from '../abstract-component';
import {SortType} from 'Consts/consts';


export class Sort extends AbstractComponent {
  constructor(sorts, onChangeSortType) {
    super();
    this._sorts = sorts;
    this._onChangeSortType = onChangeSortType;

    this._currentSortType = SortType.DEFAULT;

    this.setOnChangeSortType(this._onChangeSortType);
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

      this.getElement().querySelector(`.sort__button--active`).classList.remove(`sort__button--active`);
      evt.target.classList.add(`sort__button--active`);

      handler(this._currentSortType);
    });
  }
}
