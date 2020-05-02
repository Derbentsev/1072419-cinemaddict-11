import {
  RenderPosition
} from 'Consts/consts';


/**
 * Создаем функцию для рендеринга (вставки в DOM) компонентов
 * @param {object} container - Контейнер, в который вставляем
 * @param {string} component - Вёрстка, которую рендерим
 * @param {string} place - Место в контейнере
 * @return {void}
 */
const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFRERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistsElement = !!(parentElement && newElement && oldElement);

  if (isExistsElement && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};


export {
  render,
  remove,
  replace,
};
