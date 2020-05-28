import AbstractSmartComponent from "../abstract-smart-component";
import {createStatisticTemplate} from './statistic-tpl';
import {StatsMode} from '@consts';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';


export default class Statistic extends AbstractSmartComponent {
  constructor(moviesModel) {
    super();

    this._moviesModel = moviesModel;

    this._movies = this._getWatchedMovies(this._moviesModel.getMoviesAll());

    this._chart = null;
    this._topGenre = this._getTopGenre();

    this._filterMode = StatsMode.ALL;
    this._lastWatchingDate = null;

    this._getTopGenre = this._getTopGenre.bind(this);
    this._onStatisticClick = this._onStatisticClick.bind(this);

    this._renderCharts();
  }

  recoveryListeners() {}

  getTemplate() {
    return createStatisticTemplate(this._movies, this._filterMode, this._topGenre);
  }

  rerender(filterMode) {
    this._filterMode = filterMode;

    switch (this._filterMode) {
      case StatsMode.ALL:
        this._lastWatchingDate = new Date(2000, 1, 1);
        break;
      case StatsMode.TODAY:
        this._lastWatchingDate = new Date();
        break;
      case StatsMode.WEEK:
        this._lastWatchingDate = moment().add(-7, `d`).toDate();
        break;
      case StatsMode.MONTH:
        this._lastWatchingDate = moment().add(-30, `d`).toDate();
        break;
      case StatsMode.YEAR:
        this._lastWatchingDate = moment().add(-365, `d`).toDate();
        break;
    }

    this._movies = this._getWatchedMovies();
    this._topGenre = this._getTopGenre();

    super.rerender();

    this._renderCharts();
  }

  _renderCharts() {
    this.getElement().querySelectorAll(`.statistic__filters-label`)
      .forEach((element) => element.addEventListener(`click`, this._onStatisticClick));

    this._movies = this._getWatchedMovies();

    const element = this.getElement();
    const statisticCtx = element.querySelector(`.statistic__chart`);

    this._resetChart();

    this._chart = renderChart(statisticCtx, this._movies);
  }

  _resetChart() {
    if (this._chart) {
      this._chart.destroy();
      this._chart = null;
    }
  }

  _getWatchedMovies() {
    return this._moviesModel.getMoviesAll().filter((movie) => {
      return (this._lastWatchingDate) ? movie.isWatched && (movie.watchingDate > this._lastWatchingDate.toISOString()) : true;
    });
  }

  _onStatisticClick(evt) {
    const newFilterMode = evt.target.htmlFor.split(`-`)[1];

    if (newFilterMode === this._filterMode) {
      return;
    }

    this.rerender(newFilterMode);
  }

  _getTopGenre() {
    let countGenre = 0;
    let topGenre = ``;

    const genres = getUniqGenres(this._movies);

    genres.forEach((genre) => {
      const count = calcUniqCountGenres(this._movies, genre);
      if (countGenre < count) {
        countGenre = count;
        topGenre = genre;
      }
    });

    return topGenre;
  }
}


const getUniqGenres = (movies) => {
  return [].concat(...movies.map((movie) => movie.genre))
    .filter(getUniqItems);
};

const getUniqItems = (item, index, array) => {
  return array.indexOf(item) === index;
};

const calcUniqCountGenres = (movies, genre) => {
  return movies.filter((movie) => movie.genre.includes(genre)).length;
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
        anchor: `start`,
        barThickness: 24
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
