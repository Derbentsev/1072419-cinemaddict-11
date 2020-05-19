/**
 * Создаем разметку блока Статистики
 * @param {number} filmCount - Количество фильмов на сайте
 * @return {string}
 */
export const createFooterStatisticMarkup = (filmCount) => {
  return (
    `<section class="footer__statistics">
      <p>${filmCount} movies inside</p>
    </section>`
  );
};
