import {
  Filter
} from '../components/filter/filter';
import {
  render
} from 'Utils/render';
import {
  RenderPosition,
  FilterType,
} from '../consts';


export class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._filterComponent = null;

    this._activeFilterType = FilterType.ALL;

    this._onFilterChange = this._onFilterChange.bind(this);
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

    this._filterComponent = new Filter(filters);
    this._filterComponent.setOnFilterChange(this._onFilterChange);
    render(this._container, this._filterComponent, RenderPosition.BEFOREEND);
  }

  _onFilterChange(filterType) {
    this._moviesModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }
}
