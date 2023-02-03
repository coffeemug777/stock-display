import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-change-compare-ticker',
  templateUrl: './change-compare-ticker.component.html',
  styleUrls: ['./change-compare-ticker.component.scss'],
})
export class ChangeCompareTickerComponent {
  @Input()
  dd1 = '';
  @Input()
  dd2 = '';
  @Input()
  dd3 = '';

  @Input()
  tickers: string[] = [];

  dd1Change(ticker: string) {
    this.dd1 = ticker;
  }

  dd2Change(ticker: string) {
    this.dd2 = ticker;
  }

  dd3Change(ticker: string) {
    this.dd3 = ticker;
  }
}
