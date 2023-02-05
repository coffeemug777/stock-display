import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTickerDisplayComponent } from './new-ticker-display.component';

describe('NewTickerDisplayComponent', () => {
  let component: NewTickerDisplayComponent;
  let fixture: ComponentFixture<NewTickerDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTickerDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTickerDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
