import {
  RenderPosition
} from '../consts';


/**
 * Создаем функцию для рендеринга (вставки в DOM) компонентов
 * @param {object} container - Контейнер, в который вставляем
 * @param {string} element - DOM-элемент, который вставляем
 * @param {string} place - Место в контейнере
 * @return {void}
 */
export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFRERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
