import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StockService } from '../services/stock.service';

@Injectable({
  providedIn: 'root',
})
export class NewTickerGuard implements CanActivate {
  constructor(private stockService: StockService, private router: Router) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    const routeState = this.router.getCurrentNavigation()?.extras.state;
    if (routeState) {
      const ticker = routeState['ticker'];
      return new Promise((res) => {
        this.stockService.getStockByTickerAPI(ticker).subscribe(
          (data) => {
            console.log('data is ', data);
            if (data) {
              res(true);
            }
          },
          (error) => {
            console.log('error api is ', error);
            res(false);
          }
        );
      });
    } else {
      alert('no can do jose, ticker empty');
      return false;
    }
  }
}
