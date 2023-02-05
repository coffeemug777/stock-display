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
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log(
      'guard run',
      state,
      this.router.getCurrentNavigation()?.extras.state
    );

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

    // return new Promise((res) => {
    //   this.stockService.getStockByTickerAPI('IBM').subscribe(
    //     (data) => {
    //       console.log('data is ', data);
    //       if (data) {
    //         res(true);
    //       }
    //     },
    //     (error) => {
    //       console.log('error api is ', error);
    //       res(false);
    //     }
    //   );
    // });
  }
}

/*
canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(res => {
        this.authservice.isUserAuthenticatedbyType("type1").subscribe(
            (data) => {
                if (data === true) {
                    res(true);
                } else {
                    this.router.navigate(['/']);
                    res(false);
                }
            },
            (error) => {
                this.router.navigate(['/']);
                res(false);
            }
        );
    });
}

*/
