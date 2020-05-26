import {createSortTemplate} from './sort-tpl';
import AbstractComponent from '@components/abstract-component';
import {SortType} from '@consts';


export default class Sort extends AbstractComponent {
  constructor(onChangeSortType) {
    super();
    this._sorts = null;
    this._onChangeSortType = onChangeSortType;

    this._currentSortType = SortType.DEFAULT;

    this._setOnChangeSortType(this._onChangeSortType);
  }

  getTemplate() {
    return createSortTemplate(this._sorts);
  }

  getSortType() {
    return this._currentSortType;
  }

  _setOnChangeSortType(handler) {
    this.getElement().querySelectorAll(`.sort__button`)
      .forEach((sortButton) => {
        sortButton.addEventListener(`click`, (evt) => {
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
      });
  }
}
