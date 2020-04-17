import {createStatisticMarkup} from './statistic-tpl.js';


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
