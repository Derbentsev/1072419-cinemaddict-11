/**
 * Создаем разметку Кнопка «Show more»
 * @return {void}
 */
const createButtonLoadMore = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

class ButtonLoadMore {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createButtonLoadMore();
  }
}


export {ButtonLoadMore};
