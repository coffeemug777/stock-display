import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { StockService } from '../services/stock.service';

import { NewTickerResolver } from './new-ticker.resolver';

describe('NewTickerResolver', () => {
  let resolver: NewTickerResolver;
  let stockService: StockService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [StockService],
    });
    resolver = TestBed.inject(NewTickerResolver);
    stockService = TestBed.inject(StockService);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
