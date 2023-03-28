import { EnvironmentService } from './../data/service/environment.service';
import { Component, AfterViewInit } from '@angular/core';
import { first } from 'rxjs';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss'],
})
export class GraphsComponent implements AfterViewInit {
  temperatureHistory: any = [];
  chartOptions = {
    theme: 'dark2',
    zoomEnabled: true,
    exportEnabled: true,
    title: {
      text: 'Temperature History',
    },
    subtitles: [
      {
        text: 'Loading Data...',
        fontSize: 24,
        horizontalAlign: 'center',
        verticalAlign: 'center',
        dockInsidePlotArea: true,
      },
    ],
    axisY: {
      title: 'Temperature',
    },
    data: [
      {
        type: 'line',
        xValueFormatString: 'DDD MMM hh:mm',
        dataPoints: this.temperatureHistory,
      },
    ],
  };
  chart: any;

  constructor(private environmentService: EnvironmentService) {}

  getChartInstance(chart: object) {
    this.chart = chart;
  }

  ngAfterViewInit(): void {
    this.environmentService
      .getTemperatureHistory()
      .pipe(first())
      .subscribe((response) => {
        let data = response;
        for (let i = 0; i < data.length; i++) {
          let date = new Date(data[i].date);
          this.temperatureHistory.push({
            x: date,
            y: Number(data[i].temperature),
          });
        }
        this.chart.subtitles[0].remove();
      });
  }
}
