import {
  getRandomIntegerNumber
} from '../utils.js';


const FILM_COUNT_MIN = 100;
const FILM_COUNT_MAX = 100000;


/**
 * Создаем разметку блока Статистики
 * @return {string}
 */
const createStatisticMarkup = () => {
  const moviesCount = getRandomIntegerNumber(FILM_COUNT_MIN, FILM_COUNT_MAX);

  return (
    `<section class="footer__statistics">
      <p>${moviesCount} movies inside</p>
    </section>`
  );
};

class Statistic {
  constructor() {

  }

  getTemplate() {
    return createStatisticMarkup();
  }
}


export {
  Statistic
};
