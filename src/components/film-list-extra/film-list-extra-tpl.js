/**
 * Создаем разметку раздела Top rated и Most commented
 * @param {string} title - Название раздела
 * @return {void}
 */
export const createFilmListExtra = (title) => {
  return (
    `<section class="films-list--extra">
        <h2 class="films-list__title">${title}</h2>
        <div class="films-list__container"></div>
      </section>`
  );
};
