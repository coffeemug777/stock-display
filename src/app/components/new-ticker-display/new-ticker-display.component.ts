import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StockData } from 'src/app/services/stock.service';

@Component({
  selector: 'app-new-ticker-display',
  templateUrl: './new-ticker-display.component.html',
  styleUrls: ['./new-ticker-display.component.scss'],
})
export class NewTickerDisplayComponent {
  constructor(private actRoute: ActivatedRoute, private router: Router) {}

  stocks: StockData[] = [];

  backToDashboard() {
    this.router.navigate(['/']);
  }

  ngOnInit() {
    const loadedData = this.actRoute.snapshot.data['newData'];
    this.stocks.push(loadedData);
  }
}
