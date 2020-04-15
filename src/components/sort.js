/**
 * Создаем разметку отдельной сортировки
 * @param {object} sort - Сортировка
 * @param {boolean} isActive - Отметка, активна ли сортировка
 * @return {string}
 */
const createSortMarkup = (sort, isActive) => {
  const {name} = sort;

  return (
    `<li><a href="#" class="sort__button ${isActive ? `sort__button--active` : ``}">${name}</a></li>`
  );
};

/**
 * Создаем разметку блока Сортировок
 * @param {object} sorts - Массив сортировок
 * @return {string}
 */
const createSortTemplate = (sorts) => {
  const sortsMarkup = sorts.map((it, i) =>
    createSortMarkup(it, i === 0))
  .join(`\n`);

  return (
    `<ul class="sort">
      ${sortsMarkup}
    </ul>`
  );
};

class Sort {
  constructor(sorts) {
    this._sorts = sorts
  }

  getTemplate() {
    return createSortTemplate(this._sorts);
  }
}


export {
  Sort
};
