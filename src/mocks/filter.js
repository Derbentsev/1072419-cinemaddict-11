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
const generateFilters = (films) => {
  return FilterNames.map((it) => {
    return {
      name: it,
      count: films.length > 0 ? Math.floor(Math.random() * 10) : 0,
    };
  });
};


export {
  generateFilters
};
