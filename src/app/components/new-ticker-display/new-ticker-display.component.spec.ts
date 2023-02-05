import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NewTickerDisplayComponent } from './new-ticker-display.component';

describe('NewTickerDisplayComponent', () => {
  let component: NewTickerDisplayComponent;
  let fixture: ComponentFixture<NewTickerDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [NewTickerDisplayComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { data: { newData: { symbol: 'test', data: [] } } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewTickerDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
