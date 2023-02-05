import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { of } from 'rxjs';
import { StockService } from '../services/stock.service';
import { NewTickerGuard } from './new-ticker.guard';

describe('NewTickerGuard no routeState', () => {
  let guard: NewTickerGuard;
  let mockSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>(
    'RouterStateSnapshot',
    ['toString']
  );
  let routerStub = {
    getCurrentNavigation: function () {
      return;
    },
  };
  let router: Router;
  let stockService: StockService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        NewTickerGuard,
        { provide: RouterStateSnapshot, useValue: mockSnapshot },
        { provide: Router, useValue: routerStub },
        StockService,
      ],
    });
    router = TestBed.inject(Router);
    guard = TestBed.inject(NewTickerGuard);
    stockService = TestBed.inject(StockService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should block if ticker is undefined', () => {
    const ssSpy = spyOn(stockService, 'getStockByTickerAPI').and.returnValue(
      of(false)
    );
    const res$ = guard.canActivate(new ActivatedRouteSnapshot(), mockSnapshot);

    expect(ssSpy).not.toHaveBeenCalled();
    expect(res$).toBe(false);
  });
});

describe('NewTickerGuard no routeState', () => {
  let guard: NewTickerGuard;
  let mockSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>(
    'RouterStateSnapshot',
    ['toString']
  );
  let routerStub = {
    getCurrentNavigation: function () {
      return { extras: { state: { ticker: 'QQQ' } } };
    },
  };
  let router: Router;
  let stockService: StockService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        NewTickerGuard,
        { provide: RouterStateSnapshot, useValue: mockSnapshot },
        { provide: Router, useValue: routerStub },
        StockService,
      ],
    });
    router = TestBed.inject(Router);
    guard = TestBed.inject(NewTickerGuard);
    stockService = TestBed.inject(StockService);
  });

  it('should return happy path', async () => {
    const ssSpy = spyOn(stockService, 'getStockByTickerAPI').and.returnValue(
      of(true)
    );
    const res$ = await guard.canActivate(
      new ActivatedRouteSnapshot(),
      mockSnapshot
    );
    expect(ssSpy).toHaveBeenCalled();
    expect(res$).toEqual(true);
  });

  it('should return error', async () => {
    const expError = new Error('aaa');
    const ssSpy = spyOn(stockService, 'getStockByTickerAPI').and.throwError(
      expError
    );

    try {
      await guard.canActivate(new ActivatedRouteSnapshot(), mockSnapshot);
    } catch (error) {
      expect(error).toEqual(expError);
      expect(ssSpy).toHaveBeenCalled();
    }
  });
});
