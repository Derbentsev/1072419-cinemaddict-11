/**
 * Создаем разметку блока Статистики
 * @param {number} filmCount - Количество фильмов на сайте всего
 * @return {string}
 */
const createStatisticMarkup = (filmCount) => {
  const moviesCount = filmCount;

  return (
    `<section class="footer__statistics">
      <p>${moviesCount} movies inside</p>
    </section>`
  );
};


export {createStatisticMarkup};
