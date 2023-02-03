import { Component } from '@angular/core';
import Highcharts from 'highcharts/es-modules/masters/highcharts.src';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent {
  Highcharts = Highcharts;
  linechart: any = {
    series: [
      {
        data: [1, 2, 3],
      },
    ],
    chart: {
      type: 'line',
    },
    title: {
      text: 'linechart',
    },
  };
}
