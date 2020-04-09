import {getRandomArrayItem} from '../utils.js';


const Comments = [
  `Film name 1`,
  `Film name 2`,
  `Film name 3`,
];

const Emojis = [
  `public\images\emoji\angry.png`,
  `public\images\emoji\puke.png`,
  `public\images\emoji\sleeping.png`,
];

const Authors = [
  `John Doe`,
  `Tim Macoveev`,
];


/**
 * Генерирует дату в формате `2019/12/31 23:59`
 * @return {string} Строка в формате `2019/12/31 23:59`
 */
const generateRandomDate = () => {
  return `2019/12/31 23:59`;
};

/**
 * Генерируем новый комментарий
 * @return {object} - Случайно сгенерированный комментарий
 */
const generateComment = () => {
  return {
    text: getRandomArrayItem(Comments),
    emotion: `./public/images/emoji/` + getRandomArrayItem(Emojis),
    author: getRandomArrayItem(Authors),
    date: generateRandomDate(),
  };
};


export {
  generateComment
};
