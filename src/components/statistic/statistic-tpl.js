/**
 * Создаем разметку блока Статистики
 * @param {number} filmCount - Количество фильмов на сайте
 * @return {string}
 */
export const createStatisticMarkup = (filmCount) => {
  return (
    `<section class="footer__statistics">
      <p>${filmCount} movies inside</p>
    </section>`
  );
};
