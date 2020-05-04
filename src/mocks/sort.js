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
  return SortNames.map((it, i) => {
    return {
      name: it,
      isActive: i === 0,
    };
  });
};
