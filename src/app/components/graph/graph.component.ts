import { Component, Input } from '@angular/core';
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
} from 'chart.js';
import 'chart.js/auto';

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title);
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent {
  @Input()
  stocks: any[] = [];

  public chart!: ChartJS;

  updateFlag = false;

  ngOnChanges() {
    if (this.chart) {
      this.chart.data.datasets = this.buildData();
      this.chart.update();
    }
  }

  buildData() {
    const datasets = this.stocks.map((stock) => ({
      label: stock.symbol,
      data: stock.data,
    }));
    return datasets;
  }

  drawChart() {
    this.chart = new ChartJS('MyChart', {
      type: 'line',
      data: {
        datasets: this.buildData(),
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  ngOnInit() {
    this.drawChart();
  }
}
