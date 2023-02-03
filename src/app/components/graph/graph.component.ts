import { Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent {
  @Input()
  stocks: any[] = [];

  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;

  linechart: Highcharts.Options = {
    series: [
      {
        type: 'line',
        data: this.stocks[0]?.data,
      },
    ],
    xAxis: {
      type: 'datetime',
    },
    chart: {
      type: 'line',
    },
    title: {
      text: '',
    },
  };

  updateGraph() {}

  ngOnInit() {
    if (this.linechart.series?.length) {
      this.linechart.series[0] = {
        type: 'line',
        name: this.stocks[0].symbol,
        data: this.stocks[0].data,
      };
    }

    this.updateFlag = true;
  }
}
