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
      // {
      //   type: 'line',
      //   data: this.stocks[0]?.data,
      //   visible: false,
      // },
      // {
      //   type: 'line',
      //   data: this.stocks[0]?.data,
      //   visible: false,
      // },
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

  ngOnChanges() {
    if (this.stocks.length) {
      this.linechart.series = [];
      this.stocks.forEach((element, i) => {
        console.log('here?', i);
        this.linechart.series?.push({
          type: 'line',
          name: element.symbol,
          data: element.data,
          visible: true,
        });
        // if (this.linechart.series?.length) {
        //   console.log('here?2', i);
        //   this.linechart.series[i] = {
        //     type: 'line',
        //     name: element.symbol,
        //     data: element.data,
        //     visible: true,
        //   };
        // }
      });
      console.log(this.linechart);
      this.updateFlag = true;
    }
  }

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
