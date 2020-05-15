import {AbstractSmartComponent} from "../abstract-smart-component";
import {createStatisticTemplate} from './statistic-tpl';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';

const FilterMode = {
  ALL: `all`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`,
};


export class StatisticComponent extends AbstractSmartComponent {
  constructor(moviesModel) {
    super();

    this._moviesModel = moviesModel;

    this._chart = null;
    this._filterMode = FilterMode.ALL;
    this._lastReleaseDate = new Date(9999, 12, 31);

    this._onStatisticFilterClick = this._onStatisticFilterClick.bind(this);

    this._renderCharts();
  }

  getTemplate() {
    return createStatisticTemplate(this._moviesModel.getMoviesAll(), this._lastReleaseDate);
  }

  recoveryListeners() {}

  rerender(filterMode) {
    this._filterMode = filterMode;

    switch (this._filterMode) {
      case FilterMode.ALL:
        this._lastReleaseDate = new Date(9999, 12, 31);
        break;
      case FilterMode.TODAY:
        this._lastReleaseDate = new Date();
        break;
      case FilterMode.WEEK:
        this._lastReleaseDate = moment().add(-7, `d`).toDate();
        break;
      case FilterMode.MONTH:
        this._lastReleaseDate = moment().add(-30, `d`).toDate();
        break;
      case FilterMode.YEAR:
        this._lastReleaseDate = moment().add(-365, `d`).toDate();
        break;
    }

    super.rerender();

    this._renderCharts();
  }

  _onStatisticFilterClick(evt) {
    const newFilterMode = evt.target.htmlFor.split(`-`)[1];

    if (newFilterMode === this._filterMode) {
      return;
    }

    this.rerender(newFilterMode);
  }

  _renderCharts() {
    this.getElement().querySelectorAll(`.statistic__filters-label`)
      .forEach((element) => element.addEventListener(`click`, this._onStatisticFilterClick));

    const element = this.getElement();
    const statisticCtx = element.querySelector(`.statistic__chart`);

    this._chart = renderChart(statisticCtx, this._moviesModel.getMoviesAll());
  }
}

const getUniqItems = (item, index, array) => {
  return array.indexOf(item) === index;
};

const calcUniqCountGenres = (movies, genre) => {
  return movies.filter((movie) => movie.genre === genre).length;
};

const renderChart = (statisticCtx, movies) => {
  const BAR_HEIGHT = 50;

  const genres = movies
    .map((movie) => movie.genre)
    .filter(getUniqItems);

  statisticCtx.height = BAR_HEIGHT * 5;
  statisticCtx.width = 1000;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: genres,
      datasets: [{
        data: genres.map((genre) => calcUniqCountGenres(movies, genre)),
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};
