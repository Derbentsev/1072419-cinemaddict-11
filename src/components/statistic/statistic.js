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

    this._movies = this._getAllWatchedMovies(this._moviesModel.getMoviesAll());

    this._chart = null;
    this._topGenre = this._getTopGenre();

    this._filterMode = FilterMode.ALL;
    this._lastWatchingDate = null;

    this._getTopGenre = this._getTopGenre.bind(this);
    this._onStatisticFilterClick = this._onStatisticFilterClick.bind(this);

    this._renderCharts();
  }

  getTemplate() {
    return createStatisticTemplate(this._movies, this._filterMode, this._topGenre);
  }

  recoveryListeners() {}

  rerender(filterMode) {
    this._filterMode = filterMode;

    switch (this._filterMode) {
      case FilterMode.ALL:
        this._lastWatchingDate = null;
        break;
      case FilterMode.TODAY:
        this._lastWatchingDate = new Date();
        break;
      case FilterMode.WEEK:
        this._lastWatchingDate = moment().add(-7, `d`).toDate();
        break;
      case FilterMode.MONTH:
        this._lastWatchingDate = moment().add(-30, `d`).toDate();
        break;
      case FilterMode.YEAR:
        this._lastWatchingDate = moment().add(-365, `d`).toDate();
        break;
    }

    this._movies = this._moviesModel.getMoviesAll().filter((movie) => {
      if (this._lastWatchingDate !== null) {
        return movie.isWatched && movie.watchingDate > this._lastWatchingDate;
      }

      return true;
    });

    this._topGenre = this._getTopGenre();

    super.rerender();

    this._renderCharts();
  }

  _getAllWatchedMovies(movies) {
    return movies.filter((movie) => {
      return movie.isWatched;
    });
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

    this._chart = renderChart(statisticCtx, this._movies);
  }

  _getTopGenre() {
    let countGenre = 0;
    let topGenre = ``;

    const genres = getUniqGenres(this._movies);

    genres.forEach((genre) => {
      let count = calcUniqCountGenres(this._movies, genre);
      if (countGenre < count) {
        countGenre = count;
        topGenre = genre;
      }
    });

    return topGenre;
  }
}

const getUniqGenres = (movies) => {
  return movies.map((movie) => movie.genre)
    .filter(getUniqItems);
};

const getUniqItems = (item, index, array) => {
  return array.indexOf(item) === index;
};

const calcUniqCountGenres = (movies, genre) => {
  return movies.filter((movie) => movie.genre === genre).length;
};

const renderChart = (statisticCtx, movies) => {
  const BAR_HEIGHT = 50;
  const BAR_WIDTH = 1000;

  const genres = getUniqGenres(movies);

  statisticCtx.height = BAR_HEIGHT * genres.length;
  statisticCtx.width = BAR_WIDTH;

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
