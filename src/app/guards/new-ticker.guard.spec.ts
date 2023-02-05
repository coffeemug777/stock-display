import { TestBed } from '@angular/core/testing';

import { NewTickerGuard } from './new-ticker.guard';

describe('NewTickerGuard', () => {
  let guard: NewTickerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NewTickerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
