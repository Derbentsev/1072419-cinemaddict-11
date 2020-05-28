import {FilterType} from '@consts';

/**
 * Создаем разметку отдельного фильтра
 * @param {object} filter - Фильтр
 * @param {boolean} isActive - Отметка, активен ли фильтр
 * @return {string}
 */
const createFilterMarkup = (filter, isActive) => {
  const {name, count} = filter;

  return (
    `<a href="#" data-type="${name}" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">${name} 
      ${name === FilterType.ALL ? `` : `<span class="main-navigation__item-count">${count}</span>`}
    </a>`
  );
};

/**
 * Создаем разметку блока Категории фильмов
 * @param {object} filters - Массив фильтров
 * @return {string}
 */
export const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((it) =>
    createFilterMarkup(it, it.isActive))
      .join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filtersMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};
