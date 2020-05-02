/**
 * Создаем разметку отдельной сортировки
 * @param {object} sort - Сортировка
 * @param {boolean} isActive - Отметка, активна ли сортировка
 * @return {string}
 */
const createSortMarkup = (sort) => {
  const {name, isActive} = sort;

  return (
    `<li>
      <a href="#" data-sort-type="${name.split(` `).slice(-1)}" class="sort__button ${isActive ? `sort__button--active` : ``}">${name}</a>
    </li>`
  );
};

/**
 * Создаем разметку блока Сортировок
 * @param {object} sorts - Массив сортировок
 * @return {string}
 */
export const createSortTemplate = (sorts) => {
  const sortsMarkup = sorts.map((it) =>
    createSortMarkup(it))
  .join(`\n`);

  return (
    `<ul class="sort">
      ${sortsMarkup}
    </ul>`
  );
};
