import {getRandomIntegerNumber} from '../../utils.js';
import {FilmSettings} from '../../consts.js';


/**
 * Создаем разметку блока Статистики
 * @return {string}
 */
const createStatisticMarkup = () => {
  const moviesCount = getRandomIntegerNumber(FilmSettings.FOOTER_FILM_COUNT_MIN, FilmSettings.FOOTER_FILM_COUNT_MAX);

  return (
    `<section class="footer__statistics">
      <p>${moviesCount} movies inside</p>
    </section>`
  );
};


export {createStatisticMarkup};
