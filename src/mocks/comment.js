import {
  getRandomArrayItem,
  getRandomDate,
} from 'Utils/common';


const Comments = [
  `Comment 1`,
  `Comment 2`,
  `Comment 3`,
];

const Emojis = [
  `angry.png`,
  `puke.png`,
  `sleeping.png`,
];

const Authors = [
  `John Doe`,
  `Tim Macoveev`,
];

const COMMENT_DATE_MIN = new Date(`01.01.2010`);
const COMMENT_DATE_MAX = new Date(`01.01.2020`);


/**
 * Генерируем новый комментарий
 * @return {object} - Случайно сгенерированный комментарий
 */
const generateComment = () => {
  return {
    id: String(new Date() + Math.random()),
    text: getRandomArrayItem(Comments),
    emotion: getRandomArrayItem(Emojis),
    author: getRandomArrayItem(Authors),
    date: getRandomDate(COMMENT_DATE_MIN, COMMENT_DATE_MAX),
  };
};

/**
 * Генерируем массив комментариев
 * @param {number} count - Число комментариев
 * @return {object} - Массив комментариев
 */
export const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};
