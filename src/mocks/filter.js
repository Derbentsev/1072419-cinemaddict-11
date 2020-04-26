const FilterNames = [
  `All movies`,
  `Watchlist`,
  `History`,
  `Favorites`,
];


/**
 * Генерируем фильтры
 * @param {object} films - Массив с фильмами
 * @return {array} Массив фильтров
 */
export const generateFilters = (films) => {
  return FilterNames.map((it) => {
    return {
      name: it,
      count: films.length ? Math.floor(Math.random() * 10) : 0,
    };
  });
};
