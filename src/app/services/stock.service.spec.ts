import { TestBed } from '@angular/core/testing';
import mockStock from '../mocks/pypl.json';
import { StockService } from './stock.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('StockService', () => {
  let service: StockService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StockService],
    });
    service = TestBed.inject(StockService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
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

  it('should add data to stocks ', () => {
    expect(service.stockMap.size).toBe(4);
    mockStock['Meta Data']['2. Symbol'] = 'MOCK';

    service.addLoadedDataFromApi(mockStock);

    expect(service.stockMap.size).toBe(5);
    expect(service.getStockByTicker('MOCK').symbol).toEqual('MOCK');
  });

  it('should call API', () => {
    const dummyData = { a: 'testa', b: 'testb' };
    const ticker = 'QQQ';
    const APIKEY = 'XM9ZUC6EQJJG6HSL';
    const url =
      'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=' +
      ticker +
      '&apikey=' +
      APIKEY;

    service.getStockByTickerAPI(ticker).subscribe((data) => {
      expect(Object.keys(data).length).toBe(2);
      expect(Object.keys(data)[0]).toBe('a');
    });
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });
});
