import {
  RenderPosition
} from '../consts';


/**
 * Создаем функцию для рендеринга (вставки в DOM) компонентов
 * @param {object} container - Контейнер, в который вставляем
 * @param {string} component - Вёрстка, которую рендерим
 * @param {string} place - Место в контейнере
 * @return {void}
 */
export const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFRERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};
