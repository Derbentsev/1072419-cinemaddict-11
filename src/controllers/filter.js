import {
  Filter
} from '../components/filter/filter';
import {
  render
} from 'Utils/render';
import {
  RenderPosition,
} from '../consts';


export class FilterController {
  constructor(container, movieModel, filters) {
    this._container = container;
    this._movieModel = movieModel;

    this._filters = filters;
  }

  render() {
    render(this._container, new Filter(this._filters), RenderPosition.BEFOREEND);
  }
}
