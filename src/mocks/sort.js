const SortNames = [
  `Sort by default`,
  `Sort by date`,
  `Sort by rating`,
];


/**
 * Генерируем сортировки
 * @return {array} Массив сортировок
 */
export const generateSorts = () => {
  return SortNames.map((it) => {
    return {
      name: it,
    };
  });
};
