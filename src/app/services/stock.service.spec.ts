import { TestBed } from '@angular/core/testing';

import { StockService } from './stock.service';

describe('StockService', () => {
  let service: StockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.stockMap.size).toBeGreaterThan(0);
  });

  it('should return stock by ticker', () => {
    const expected = { symbol: 'AAPL', data: service.stockMap.get('AAPL') };
    const test = service.getStockByTicker('AAPL');

    expect(expected).toEqual(test);
  });
});
