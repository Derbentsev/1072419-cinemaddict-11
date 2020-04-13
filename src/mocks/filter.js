const FilterNames = [
  `All movies`,
  `Watchlist`,
  `History`,
  `Favorites`,
];


/**
 * Генерируем фильтры
 * @return {array} Массив фильтров
 */
const generateFilters = () => {
  return FilterNames.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * 10),
    };
  });
};


export {
  generateFilters
};
