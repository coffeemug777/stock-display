import { TestBed } from '@angular/core/testing';

import { NewTickerResolver } from './new-ticker.resolver';

describe('NewTickerResolver', () => {
  let resolver: NewTickerResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(NewTickerResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
