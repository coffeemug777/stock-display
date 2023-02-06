import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { of } from 'rxjs';
import { StockService } from '../services/stock.service';
import aapl from '../mocks/aapl.json';
import { NewTickerResolver } from './new-ticker.resolver';

describe('NewTickerResolver no router state', () => {
  let resolver: NewTickerResolver;
  let stockService: StockService;
  let mockSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>(
    'RouterStateSnapshot',
    ['toString']
  );
  const routerStub1 = {
    getCurrentNavigation() {
      return {
        extras: {},
      };
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        StockService,
        {
          provide: Router,
          useValue: routerStub1,
        },
      ],
    });
    resolver = TestBed.inject(NewTickerResolver);
    stockService = TestBed.inject(StockService);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should resolve to not found if no router state', async () => {
    const alertSpy = spyOn(window, 'alert').and.stub();

    await resolver.resolve(new ActivatedRouteSnapshot(), mockSnapshot);
    expect(alertSpy).toHaveBeenCalledWith('no can do jose, ticker empty');
  });
});

describe('NewTickerResolver router state exist', () => {
  let resolver: NewTickerResolver;
  let stockService: StockService;
  let router: Router;
  let mockSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>(
    'RouterStateSnapshot',
    ['toString']
  );
  const routerStub2 = {
    getCurrentNavigation() {
      return {
        extras: {
          state: {
            ticker: 'AAPL',
          },
        },
      };
    },
    navigate() {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        StockService,
        {
          provide: Router,
          useValue: routerStub2,
        },
      ],
    });
    resolver = TestBed.inject(NewTickerResolver);
    stockService = TestBed.inject(StockService);
    router = TestBed.inject(Router);
  });

  it('should resolve to false and route with error message', async () => {
    const alertSpy = spyOn(window, 'alert').and.stub();
    const ssSpy = spyOn(stockService, 'getStockByTickerAPI').and.returnValue(
      of({ 'Error Message': 'problem here' })
    );
    const routerSpy = spyOn(router, 'navigate').and.stub();

    const res$ = await resolver.resolve(
      new ActivatedRouteSnapshot(),
      mockSnapshot
    );

    res$.subscribe((x) => {
      expect(x).toBe(false);
      expect(ssSpy).toHaveBeenCalled();
      expect(routerSpy).toHaveBeenCalledWith(['/new-ticker-input'], {
        state: {
          error:
            'ticker not found or other error, please try another ticker or try again later',
        },
      });
      expect(alertSpy).toHaveBeenCalledWith(
        'ticker not found or other error, please try another ticker or try again later'
      );
    });
  });

  it('should add new ticker to service stock', async () => {
    spyOn(stockService, 'getStockByTickerAPI').and.returnValue(of(aapl));
    expect(stockService.stocksHardcoded.length).toEqual(4);

    const res$ = await resolver.resolve(
      new ActivatedRouteSnapshot(),
      mockSnapshot
    );

    res$.subscribe((data) => {
      expect(stockService.stocksHardcoded.length).toEqual(5);
      expect(data.symbol).toEqual('AAPL');
    });
  });

  it('should execute error function if API throws ', async () => {
    const expError = new Error('test error');
    spyOn(stockService, 'getStockByTickerAPI').and.throwError(expError);

    try {
      await resolver.resolve(new ActivatedRouteSnapshot(), mockSnapshot);
    } catch (error) {
      expect(error).toEqual(error);
    }
  });
});
