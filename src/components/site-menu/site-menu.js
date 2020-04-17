import {createSiteMenu} from './site-menu-tpl.js';


class SiteMenu {
  constructor() {

  }

  getTemplate() {
    return createSiteMenu();
  }
}


export {SiteMenu};
