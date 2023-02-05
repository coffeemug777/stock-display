import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { NewTickerInputComponent } from './new-ticker-input.component';

describe('NewTickerInputComponent', () => {
  let component: NewTickerInputComponent;
  let fixture: ComponentFixture<NewTickerInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [NewTickerInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewTickerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
