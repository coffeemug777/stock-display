import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
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
      return new Promise((resolve) => {
        this.stockService.getStockByTickerAPI(ticker).subscribe((data) => {
          if (data) {
            resolve(true);
          }
        });
      });
    } else {
      alert('no can do jose, ticker empty');
      return false;
    }
  }
}
