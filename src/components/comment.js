/**
 * Создаем разметку Комментарии к фильму
 * @param {object} comment - Комментарий
 * @return {string} Разметка комментария к фильму
 */
const createCommentMarkup = (comment) => {
  const {emotion, text, author, date} = comment;

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${date}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

class Comment {
  constructor(comment) {
    this._commet = comment;
  }

  getTemplate() {
    return createCommentMarkup(this._commet);
  }
}


export {Comment};
