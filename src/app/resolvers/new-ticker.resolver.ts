import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { StockService } from '../services/stock.service';

@Injectable({
  providedIn: 'root',
})
export class NewTickerResolver implements Resolve<any> {
  constructor(private stockService: StockService, private router: Router) {}

  resolve(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<any> {
    const routeState = this.router.getCurrentNavigation()?.extras.state;
    if (routeState) {
      const ticker = routeState['ticker'];
      return this.stockService.getStockByTickerAPI(ticker).pipe(
        map((data) => {
          //Object { "Error Message": "Invalid API call. Please retry or visit the documentation (https://www.alphavantage.co/documentation/) for TIME_SERIES_MONTHLY." }
          if (Object.hasOwn(data, 'Error Message')) {
            this.router.navigate(['/new-ticker-input'], {
              state: {
                error:
                  'ticker not found or other error, please try another ticker or try again later',
              },
            });
            alert(
              'ticker not found or other error, please try another ticker or try again later'
            );
            return false;
          } else {
            this.stockService.addLoadedDataFromApi(data);
            return this.stockService.getStockByTicker(ticker);
          }
        })
      );
    } else {
      alert('no can do jose, ticker empty');
      return of(false);
    }
  }
}
