/**
 * Создаем функцию для рендеринга (вставки в DOM) компонентов
 * @param {object} container - Элемент, который вставляем
 * @param {string} template - Вёрстка, которую вставляем
 * @param {string} place - Место в контейнере
 * @return {void}
 */
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


export {render};
