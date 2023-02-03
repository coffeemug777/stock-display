import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCompareTickerComponent } from './change-compare-ticker.component';

describe('ChangeCompareTickerComponent', () => {
  let component: ChangeCompareTickerComponent;
  let fixture: ComponentFixture<ChangeCompareTickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeCompareTickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeCompareTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
