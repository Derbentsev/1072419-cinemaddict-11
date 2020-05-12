import {
  Filter
} from '../components/filter/filter';
import {
  render,
  replace,
} from 'Utils/render';
import {
  RenderPosition,
  FilterType,
} from '../consts';


export class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._oldComponent = null;
    this._filterComponent = null;

    this._activeFilterType = FilterType.ALL;

    this._onFilterChange = this._onFilterChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);

    this._moviesModel.setOnDataChange(this._onDataChange);
  }

  render() {
    const allMovies = this._moviesModel.getMoviesAll();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: this._moviesModel.getMoviesByFilter(allMovies, filterType).length,
        isActive: filterType === this._activeFilterType,
      };
    });

    this._oldComponent = this._filterComponent;

    this._filterComponent = new Filter(filters);
    this._filterComponent.setOnFilterChange(this._onFilterChange);

    if (this._oldComponent) {
      replace(this._filterComponent, this._oldComponent);
      return;
    }

    render(this._container, this._filterComponent, RenderPosition.BEFOREEND);
  }

  _onFilterChange(filterType) {
    this._moviesModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}
