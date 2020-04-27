/**
 * Создаем разметку отдельной сортировки
 * @param {object} sort - Сортировка
 * @param {boolean} isActive - Отметка, активна ли сортировка
 * @return {string}
 */
const createSortMarkup = (sort, isActive) => {
  const {name} = sort;

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
  const sortsMarkup = sorts.map((it, i) =>
    createSortMarkup(it, i === 0))
  .join(`\n`);

  return (
    `<ul class="sort">
      ${sortsMarkup}
    </ul>`
  );
};
