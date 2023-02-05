import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { NewTickerGuard } from './new-ticker.guard';

describe('NewTickerGuard', () => {
  let guard: NewTickerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    guard = TestBed.inject(NewTickerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
