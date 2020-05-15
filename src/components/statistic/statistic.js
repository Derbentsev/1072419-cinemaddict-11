import {AbstractComponent} from "../abstract-component";
import {createStatisticTemplate} from './statistic-tpl';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';


export class StatisticComponent extends AbstractComponent {
  constructor(moviesModel) {
    super();

    this._moviesModel = moviesModel;

    this._chart = null;

    this._renderCharts();
  }

  getTemplate() {
    return createStatisticTemplate(this._moviesModel);
  }

  _renderCharts() {
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
