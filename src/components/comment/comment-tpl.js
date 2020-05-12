import moment from 'moment';
import {encode} from 'he';


const formatDate = (date) => {
  return moment(date).format(`YYYY/MM/DD HH:mm`);
};

export const createCommentTemplate = ({emotion, text: notSanitizedText, author, date}) => {
  const dateFormatted = formatDate(date);
  const text = encode(notSanitizedText);

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${dateFormatted}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};
